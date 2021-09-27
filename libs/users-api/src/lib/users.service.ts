import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {
  CryptService,
  UserEntity,
  CreateUser,
  RolesEntity
} from '@valor-launchpad/common-api';
import {classToPlain} from 'class-transformer';
import {EmailService} from '@valor-launchpad/email';
import * as generatePassword from 'generate-password';
import {EventEmitter2} from '@nestjs/event-emitter';
import {PrismaService} from '@valor-launchpad/prisma';
import {ExistedUserException} from './exceptions/existed-user';
import {NeedVerifyEmailException} from './exceptions/need-verify-email';
import * as uuid from 'uuid';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private crypto: CryptService,
              private emailService: EmailService,
              private eventEmitter: EventEmitter2,
              private prisma: PrismaService) {
  }

  //TODO: Add profile image function

  async findByToken(token: string): Promise<UserEntity> {
    //TODO: this needs to be changed when we have more than one type of token and its extracted to its own table
    return await this.prisma.userEntity.findUnique({
      where: {
        emailVerifyToken: token
      }
    }) as UserEntity
  }

  async getRoles(): Promise<RolesEntity[]> {
    return await this.prisma.rolesEntity.findMany() as RolesEntity[];
  }

  async findAll(): Promise<UserEntity[]> {
    //Todo: this eventually needs to filter password field
    return await this.prisma.userEntity.findMany({
      include: {
        userRoles: {
          include: {
            rolesEntity: true
          }
        },
        userTags: true,
        userHistory: {
          include: {
            actingUser: true
          }
        }
      }
    }) as UserEntity[]
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
    //TODO: figure out how to make these work without an `any`
    const userCheck: UserEntity = await this.prisma.userEntity.findUnique({
      where: {
        id: userId
      },
      include: {
        userHistory: true
      },
    }) as UserEntity;
    if (userCheck) {
      await this.prisma.userEventsEntity.create({
        data: {
          target_user_id: userCheck.id,
          acting_user_id: actingUser.id,
          event: 'Resend Password Reset Email'
        }
      })
      const newPassword = this.generatePassword();
      await this.sendPasswordEmail(newPassword, userCheck.email);

      await this.prisma.userEntity.update({
        where: {
          username: userCheck.username
        },
        data: {
          password: newPassword,
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

  async resetPassword(username, actingUser) {
    const userCheck = await this.findByUsername(username);
    if (userCheck) {
      await this.prisma.userEventsEntity.create({
        data: {
          target_user_id: userCheck.id,
          acting_user_id: actingUser.id,
          event: 'Password Reset'
        }
      })
      const newPassword = this.generatePassword();
      await this.sendPasswordEmail(newPassword, userCheck.email);

      await this.prisma.userEntity.update({
        where: {
          username: username
        },
        data: {
          password: newPassword,
          passwordResetNeeded: true
        }
      })
      this.eventEmitter.emit(
        'user.passwordReset.thin',
        <UserEntity>{
          id: userCheck.id,
        },
      );

      this.eventEmitter.emit(
        'user.passwordReset.fat',
        <UserEntity>userCheck,
      );
      return;
    }
  }

  async deleteUser(username, actingUser): Promise<void> {
    //TODO: Make this ID based
    const userCheck = await this.findByUsername(username);
    if (userCheck) {
      await this.prisma.userEntity.delete({
        where: {username}
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

  async verifyUsername(username: string) {
    const userCheck = await this.prisma.userEntity.findFirst({where: {username}});
    return !!userCheck;
  }

  async createByRegister({username, email, firstName, lastName, phone, password}) {
    // check if username duplicate
    const userCheck = await this.prisma.userEntity.findFirst({where: {username}});
    if (userCheck) {
      if (userCheck.emailVerified) {
        throw new ExistedUserException();
      } else {
        throw new NeedVerifyEmailException();
      }
    }

    // create user
    const passwordCrypt = await this.crypto.hashPassword(password);
    const emailVerifyToken = uuid.v4();
    const phoneVerifyToken = Math.random().toString().substr(2, 6);
    const createdUser = await this.prisma.userEntity.create({
      data: {
        username,
        email,
        firstName,
        lastName,
        phone,
        phoneVerifyToken,
        emailVerifyToken,
        password: passwordCrypt,
        userRoles: {
          create: [{
            rolesEntity: {
              connect: {
                // todo: replace hardcode `User`
                // user registered is `User` role
                role: 'User',
              }
            }
          }]
        }
      }
    });

    // add events
    await this.prisma.userEventsEntity.create({
      data: {
        target_user_id: createdUser.id,
        acting_user_id: createdUser.id,
        event: 'User Created'
      }
    });

    return createdUser;
  }

  async createUser(user: CreateUser, actingUser: UserEntity): Promise<UserEntity> {
    const userCheck = await this.findByUsername(user.username);
    if (!userCheck) {

      const createUser = new UserEntity(user);
      if (!createUser.password) {
        createUser.password = this.generatePassword()
        await this.sendPasswordEmail(createUser.password, createUser.email);
      }
      let userRole: any = {}
      //TODO: make this tie to the actual Role
      userRole.role = 'User';
      createUser.userRoles = [userRole];
      createUser.passwordResetNeeded = true
      const createdUser = <UserEntity>await this.prisma.userEntity.create({
        data: createUser
      })

      await this.prisma.userEventsEntity.create({
        data: { //TODO Would be nice to have a type working for this CreateEventsEntity
          target_user_id: userCheck.id,
          acting_user_id: actingUser.id,
          event: 'User Created'
        }
      })
      //TODO: Set password reset token / methods
      //TODO: Set email verified when they log in and change their password

      this.eventEmitter.emit(
        'user.created.thin',
        <UserEntity>{
          id: createUser.id,
        },
      );

      this.eventEmitter.emit(
        'user.created.fat',
        <UserEntity>createUser,
      );

      return createdUser;
    } else if (!userCheck.emailVerified) {
      throw new HttpException('Please check your email to verify your email address', HttpStatus.FORBIDDEN);
    } else {
      throw new HttpException('Username already exists', HttpStatus.FORBIDDEN)
    }
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
      where: {username},
      data: {
        lastLogin: new Date()
      }
    })

    return await this.prisma.userEntity.findUnique({
      where: {username},
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

  async sendPasswordEmail(password: string, email: string): Promise<void> {
    //TODO: Move this to a template that is generated and saved in database and used from that
    await this.emailService.sendEmail({
      to: email,
      from: 'zack.chapple@valor-software.com',
      subject: 'Your Initial Password',
      text: 'Reset your password here',
      html: '<strong>Your Initial Password</strong><br><br>' +
        `${password}
          <br>
          <br>
          Or, copy and paste the following URL into your browser:
          <span>http://localhost:4200/login}</span>`,
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
      where: {username},
      data: {password: newPasswordCrypt, lastPasswordUpdateDate: now},
    });
    await this.prisma.userEventsEntity.create({
      data: {
        target_user_id: user.id,
        acting_user_id: user.id,
        event: 'Password changed'
      }
    });
  }
}
