import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CryptService, UserEntity, RolesEntity } from '@valor-launchpad/common-api';
import { classToPlain } from 'class-transformer';
import { EmailService } from '@valor-launchpad/email';
import * as generatePassword from 'generate-password';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '@valor-launchpad/prisma';
import { Prisma } from '@prisma/client';
import { ExistedUserException } from './exceptions/existed-user';
import { NeedVerifyEmailException } from './exceptions/need-verify-email';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDTO } from '../../../auth-api/src/lib/auth.dto';
import {
  RESET_PASSWORD,
  ResetPasswordPayload,
  USER_CREATED_FAT,
  USER_CREATED_THIN,
  UserCreatedFatPayload,
  UserCreatedThinPayload
} from './users-events.constant';
import { UsersEventsService } from './users-events.service';
import { EditUserDto } from './dto/edit-user.dto';
import { RoleDto } from './dto/role.dto';
import { TagDto } from './dto/tag.dto';
import { QueryUserListDto } from './dto/query-user-list.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private crypto: CryptService,
    private emailService: EmailService,
    private eventEmitter: EventEmitter2,
    private prisma: PrismaService,
    private usersEventsService: UsersEventsService,
  ) { }

  //TODO: Add profile image function

  async findByToken(token: string): Promise<UserEntity> {
    //TODO: this needs to be changed when we have more than one type of token and its extracted to its own table
    return await this.prisma.userEntity.findUnique({
      where: {
        emailVerifyToken: token
      }
    }) as UserEntity
  }

  async findByPasswordResetToken(passwordResetToken: string): Promise<UserEntity> {
    return await this.prisma.userEntity.findUnique({
      where: {
        passwordResetToken: passwordResetToken
      },
      include: {
        profile: true,
        avatar: true,
        userRoles: {
          include: {
            rolesEntity: true
          }
        }
      }
    }) as UserEntity
  }

  async getRoles(): Promise<RolesEntity[]> {
    return await this.prisma.rolesEntity.findMany() as RolesEntity[];
  }

  async findAll({roles, tags, keyword}: QueryUserListDto) {
    let tagFilter: Prisma.UserEntityWhereInput;
    if (Array.isArray(tags) && tags.length > 0) {
      tagFilter = {
        userTags: {
          some: {
            tag_id: { in: tags }
          }
        }
      };
    } else {
      // when no tag filter is applied
      // should return those records which do not have any tag
      tagFilter = {
        OR: [
          {
            userTags: {
              some: {
                tag_id: { in: tags }
              }
            }
          },
          {
            userTags: {
              none: {
                tag_id: { in: tags }
              }
            }
          }
        ]
      }
    }

    // keyword search
    let keywordFilter: Prisma.UserEntityWhereInput;
    if (keyword && keyword.length > 0) {
      keywordFilter = {
        OR: [
          { firstName: { contains: keyword } },
          { lastName: { contains: keyword } },
          { username: { contains: keyword } },
          { email: { contains: keyword } },
          { phone: { contains: keyword } },
          { userRoles: { some: { rolesEntity: { role: { contains: keyword } } } } },
          { userTags: { some: { tagsEntity: { name: { contains: keyword } } } } },
        ]
      };
    }

    return await this.prisma.userEntity.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        emailVerified: true,
        lastLogin: true,
        deletedDate: true,
        lastPasswordUpdateDate: true,
        passwordResetNeeded: true,
        userRoles: {
          include: {
            rolesEntity: true
          }
        },
        userTags: {
          include: {
            tagsEntity: true
          }
        },
        userHistory: {
          include: {
            actingUser: true
          },
          orderBy: {
            createdDate: 'desc'
          }
        }
      },
      where: {
        userRoles: {
          some: {
            role_id: { in: roles }
          }
        },
        ...tagFilter,
        ...keywordFilter,
      }
    });
  }

  //TODO verify this filters soft deletes after prisma conversion
  async findCurrent(): Promise<UserEntity[]> {
    //Todo: this eventually needs to filter password field
    return await this.prisma.userEntity.findMany({
      include: {
        userRoles: true,
        userTags: true,
        userHistory: true
      },
    }) as UserEntity[]
  }

  async findByUsername(username: string) {
    return await this.prisma.userEntity.findUnique({
      where: {
        username
      },
      include: {
        userHistory: true
      },
    });
  }

  async resendEmail(userId, actingUser): Promise<void> {
    const userCheck = await this.prisma.userEntity.findUnique({
      where: {
        id: userId
      },
      include: {
        userHistory: true
      },
    });
    if (userCheck) {
      await this.prisma.userEventsEntity.create({
        data: {
          target_user_id: userCheck.id,
          acting_user_id: actingUser.id,
          event: 'Resend Password Reset Email'
        }
      })
      const passwordResetToken = v4();
      await this.usersEventsService.sendResetPasswordEmail(userCheck.email, userCheck.username, passwordResetToken);

      await this.prisma.userEntity.update({
        where: {
          username: userCheck.username
        },
        data: {
          passwordResetToken: passwordResetToken,
          passwordResetNeeded: true
        }
      })

      this.eventEmitter.emit(
        'user.passwordResetEmailResend.thin',
        <UserEntity>{
          id: userCheck.id,
        },
      );

      this.eventEmitter.emit(
        'user.passwordResetEmailResend.fat',
        <UserEntity>userCheck,
      );
      return;
    }
  }

  async resetPassword(username: string, actingUser) {
    const userCheck = await this.findByUsername(username);
    if (userCheck) {
      await this.prisma.userEventsEntity.create({
        data: {
          target_user_id: userCheck.id,
          acting_user_id: actingUser.id,
          event: 'Pending Password Reset'
        }
      })
      const resetPasswordToken = v4();
      this.emitResetPasswordEmail(userCheck.email, username, resetPasswordToken);

      await this.prisma.userEntity.update({
        where: {
          username: username
        },
        data: {
          passwordResetNeeded: true,
          passwordResetToken: resetPasswordToken
        }
      })
    }
  }

  async deleteUsers(uid: string[], actingUser) {
    await this.prisma.$transaction([
      this.prisma.userEntity.deleteMany({
        where: { id: { in: uid } }
      }),
      ...uid.map(target_user_id => this.prisma.userEventsEntity.create({
        data: {
          target_user_id,
          acting_user_id: actingUser.id,
          event: 'User Deleted'
        }
      }))
    ]);
  }

  async deleteUser(username, actingUser): Promise<void> {
    //TODO: Make this ID based
    const userCheck = await this.findByUsername(username);
    if (userCheck) {
      await this.prisma.userEntity.delete({
        where: { username }
      })

      await this.prisma.userEventsEntity.create({
        data: {
          target_user_id: userCheck.id,
          acting_user_id: actingUser.id,
          event: 'User Deleted'
        }
      })

      this.eventEmitter.emit(
        'user.deleted.thin',
        <UserEntity>{
          id: userCheck.id,
        },
      );

      this.eventEmitter.emit(
        'user.deleted.fat',
        <UserEntity>userCheck,
      );
      return;
    }
    return;
  }

  async restoreUsers(userIds: string[], actingUser) {
    await this.prisma.$transaction([
      this.prisma.userEntity.updateMany({
        where: { id: { in: userIds } },
        data: {
          deletedDate: null
        }
      }),
      ...userIds.map(target_user_id => this.prisma.userEventsEntity.create({
        data: {
          target_user_id,
          acting_user_id: actingUser.id,
          event: 'User Restored'
        }
      }))
    ]);
  }

  async restoreUser(username, actingUser): Promise<void> {
    //TODO: Make this ID based
    const userCheck = await this.findByUsername(username);
    if (userCheck.deletedDate) {
      await this.prisma.userEntity.update({
        where: {
          username
        },
        data: {
          deletedDate: null
        }
      })

      await this.prisma.userEventsEntity.create({
        data: {
          target_user_id: userCheck.id,
          acting_user_id: actingUser.id,
          event: 'User Restored'
        }
      })

      this.eventEmitter.emit(
        'user.restored.thin',
        <UserEntity>{
          id: userCheck.id,
        },
      );

      this.eventEmitter.emit(
        'user.restored.fat',
        <UserEntity>userCheck,
      );

      return
    }
  }

  async verifyToken(token): Promise<void> {
    //TODO: Add verify event
    const user: UserEntity = await this.findByToken(token);
    if (user) {
      if (user.emailVerified) {
        throw new HttpException('Already have the user authenticated', HttpStatus.METHOD_NOT_ALLOWED);
      }

      await this.prisma.userEntity.update({
        where: {
          username: user.username
        },
        data: {
          emailVerified: true
        }
      })
      //TODO: the emailVerifyToken needs to be removed so verification cannot be done more than once
      //TODO: updating email should reset email verified
      //TODO: verification should have expiration time
      //TODO: verification should have resend if expired
      //TODO: Add resend email if they didn't receive the email

      await this.prisma.userEventsEntity.create({
        data: {
          target_user_id: user.id,
          event: 'Token Verified'
        }
      })

      this.eventEmitter.emit(
        'user.verified.thin',
        <UserEntity>{
          id: user.id,
        },
      );

      this.eventEmitter.emit(
        'user.verified.fat',
        <UserEntity>user,
      );

      return;
    } else {
      throw new HttpException('Token does not exist', HttpStatus.NOT_FOUND)
    }
  }

  async verifyPasswordResetToken(token): Promise<UserEntity> {
    const user: UserEntity = await this.findByPasswordResetToken(token);

    if (!user) {
      throw new HttpException('Token does not exist', HttpStatus.NOT_FOUND);
    }

    await this.prisma.userEventsEntity.create({
      data: {
        target_user_id: user.id,
        event: 'Password Reset Token Verified'
      }
    })

    return user;
  }

  async cancelPasswordReset(token: string): Promise<void> {
    await this.prisma.userEntity.updateMany({
      data: {
        passwordResetToken: null
      },
      where: {
        passwordResetToken: token
      }
    })

    return;
  }

  async verifyUsername(username: string) {
    const userCheck = await this.prisma.userEntity.findFirst({ where: { username } });
    return !!userCheck;
  }

  async createUser(payload: CreateUserDto | RegisterDTO, operator?: UserEntity) {
    const { username, email, firstName, lastName } = payload;
    // check if username duplicate
    const userCheck = await this.prisma.userEntity.findFirst({ where: { username } });
    if (userCheck) {
      if (userCheck.emailVerified) {
        throw new ExistedUserException();
      } else {
        throw new NeedVerifyEmailException();
      }
    }

    // create user
    let userRolesCreate: Prisma.UserRolesEntityCreateWithoutUserEntityInput[];
    let userTagsCreate: Prisma.UserTagsEntityCreateWithoutUserEntityInput[];
    let password: string;
    let phone: string;
    let passwordResetNeeded: boolean;
    if (payload instanceof CreateUserDto) {
      // created by users-list page
      userRolesCreate = payload.roles.map(r => ({
        rolesEntity: {
          connectOrCreate: {
            where: { role: r.name },
            create: { role: r.name },
          }
        }
      }));
      userTagsCreate = (payload.tags ?? []).map(t => ({
        tagsEntity: {
          connectOrCreate: {
            where: { name: t.name },
            create: { name: t.name },
          }
        }
      }))
      password = this.generatePassword();
      passwordResetNeeded = true;
    } else {
      // created by register
      userRolesCreate = [{ rolesEntity: { connect: { role: 'User' } } }];
      password = payload.password;
      phone = payload.phone;
      passwordResetNeeded = false;
    }

    const passwordCrypt = await this.crypto.hashPassword(password);
    const emailVerifyToken = v4();
    const phoneVerifyToken = Math.random().toString().substr(2, 6);
    const createdUserId = v4();
    const user = await this.prisma.userEntity.create({
      data: {
        id: createdUserId,
        username,
        email,
        firstName,
        lastName,
        phone,
        phoneVerifyToken,
        emailVerifyToken,
        passwordResetNeeded,
        password: passwordCrypt,
        userRoles: { create: userRolesCreate },
        userTags: { create: userTagsCreate },
        userHistory: {
          create: {
            // when operator is nil, means it's register flow
            acting_user_id: operator?.id || createdUserId,
            event: 'User Created'
          }
        },
        profile: {
          create: {
            updatedDate: new Date(),
            name: `${firstName} ${lastName}`,
          }
        }
      }
    });
    this.eventEmitter.emit(USER_CREATED_FAT, new UserCreatedFatPayload(
      user,
      payload instanceof CreateUserDto,
      password
    ))
    this.eventEmitter.emit(USER_CREATED_THIN, new UserCreatedThinPayload(user.id))
    return user;
  }

  async editUser(user: EditUserDto, operator: UserEntity) {
    const userRoles = await this.prisma.userRolesEntity.findMany({
      where: { user_id: user.id, deletedDate: null },
      select: { id: true, role_id: true }
    });
    const userTags = await this.prisma.userTagsEntity.findMany({
      where: { user_id: user.id, deletedDate: null },
      select: { id: true, tag_id: true },
    })
    const oldRoleIds = userRoles.map(i => i.role_id);
    const oldTagIds = userTags.map(i => i.tag_id);
    const { roles } = user;
    const tags = user.tags ?? [];

    const userRoleWillBeInsert: RoleDto[] = [];
    const userRoleWillBeDelete: string[] = [];
    const userTagWillBeInsert: TagDto[] = [];
    const userTagWillBeDelete: string[] = [];

    for (const role of roles) {
      if (role.value) {
        if (!oldRoleIds.includes(role.value)) {
          userRoleWillBeInsert.push(role);
        }
      } else {
        userRoleWillBeInsert.push(role);
      }
    }

    for (const tag of tags) {
      if (tag.id) {
        if (!oldTagIds.includes(tag.id)) {
          userTagWillBeInsert.push(tag);
        }
      } else {
        userTagWillBeInsert.push(tag);
      }
    }

    for (const { id, role_id } of userRoles) {
      // cannot find the role id in edit payload
      // means the user does not belongs to this role any more
      if (!roles.find(r => r.value === role_id)) {
        userRoleWillBeDelete.push(id);
      }
    }

    for (const { id, tag_id } of userTags) {
      // cannot find the tag id in edit payload
      // means the user does not belongs to this tag any more
      if (!tags.find(r => r.id === tag_id)) {
        userTagWillBeDelete.push(id);
      }
    }

    const now = new Date();
    return await this.prisma.userEntity.update({
      select: { username: true },
      data: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        updatedDate: now,
        userRoles: {
          // todo: N + 1 issue here, separate this into dependent expression may be better
          create: userRoleWillBeInsert.map(r => ({
            rolesEntity: {
              connectOrCreate: {
                where: { role: r.name },
                create: { role: r.name, createdDate: now },
              }
            },
            createdDate: now,
          })),
          deleteMany: { id: { in: userRoleWillBeDelete } }
        },
        userTags: {
          create: userTagWillBeInsert.map(t => ({
            tagsEntity: {
              connectOrCreate: {
                where: { name: t.name },
                create: { name: t.name, createdDate: now },
              }
            },
            createdDate: now,
          })),
          deleteMany: { id: { in: userTagWillBeDelete } }
        },
        userHistory: {
          create: {
            acting_user_id: operator.id,
            event: 'User Updated',
          }
        }
      },
      where: { id: user.id },
    });
  }

  async findOneUnsafe(username: string): Promise<UserEntity> {
    return await this.prisma.userEntity.findUnique({
      where: {
        username
      },
      include: {
        userRoles: {
          include: {
            rolesEntity: true
          }
        }
      }
    }) as UserEntity
  }

  async logIn(username): Promise<UserEntity> {
    await this.prisma.userEntity.update({
      where: { username },
      data: {
        lastLogin: new Date()
      }
    })

    return await this.prisma.userEntity.findUnique({
      where: { username },
      include: {
        profile: true,
        avatar: true,
        userRoles: {
          include: {
            rolesEntity: true
          }
        }
      }
    }) as UserEntity
  }

  generatePassword(): string {
    return generatePassword.generate({
      length: 10,
      numbers: true,
      symbols: true
    })
  }

  async findOne(username: string): Promise<User | undefined> {
    const fetchedUser = await this.prisma.userEntity.findUnique({
      where: {
        username
      },
      include: {
        profile: true,
        avatar: true,
        userRoles: {
          include: {
            rolesEntity: true
          }
        }
      }
    })
    const user = new UserEntity(fetchedUser)
    return classToPlain(user);
  }

  async updatePassword(username: string, newPasswordCrypt: string) {
    const now = new Date();
    const user = await this.prisma.userEntity.update({
      where: { username },
      data: { password: newPasswordCrypt, lastPasswordUpdateDate: now },
    });
    await this.prisma.userEventsEntity.create({
      data: {
        target_user_id: user.id,
        acting_user_id: user.id,
        event: 'Password changed'
      }
    });
  }

  async resetNewPassword(username: string, newPasswordCrypt: string) {
    const now = new Date();
    const user = await this.prisma.userEntity.update({
      where: { username },
      data: { password: newPasswordCrypt, lastPasswordUpdateDate: now, passwordResetNeeded: false, passwordResetToken: null },
    });

    await this.prisma.userEventsEntity.create({
      data: {
        target_user_id: user.id,
        acting_user_id: user.id,
        event: 'Password reset'
      }
    });

    return user;
  }

  private emitResetPasswordEmail(email: string, username: string, passwordResetToken: string) {
    this.eventEmitter.emit(RESET_PASSWORD, new ResetPasswordPayload(email, username, passwordResetToken));
  }
}
