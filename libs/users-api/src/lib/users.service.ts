import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CryptService} from '@valor-launchpad/common-api';
import {UserEntity} from '../../../common-api/src/lib/entity/user.entity';
import {classToPlain} from 'class-transformer';
import {CreateUserDto} from './dto/create-user.dto';
import {UserRolesEntity} from '../../../common-api/src/lib/entity/user-roles.entity';
import {EmailService} from '@valor-launchpad/email';
import * as generatePassword from 'generate-password';
import {UserEventsEntity} from '../../../common-api/src/lib/entity/user.events.entity';
import {EventEmitter2} from '@nestjs/event-emitter';
import {PrismaService} from '@valor-launchpad/prisma';

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

  async findByToken(token: string) {
    //TODO: this needs to be changed when we have more than one type of token and its extracted to its own table
    return await this.prisma.userEntity.findUnique({
      where: {
        emailVerifyToken: token
      }
    })
  }

  async getRoles() {
    return await this.prisma.rolesEntity.findMany();
  }

  async findAll() {
    //Todo: this eventually needs to filter password field
    return await this.prisma.userEntity.findMany({
      include: {
        userRoles: true,
        userTags: true,
        userHistory: {
          include: {
            actingUser: true
          }
        }
      }
    })
  }

  //TODO verify this filters soft deletes after prisma conversion
  async findCurrent() {
    //Todo: this eventually needs to filter password field
    return await this.prisma.userEntity.findMany({
      include: {
        userRoles: true,
        userTags: true,
        userHistory: true
      },
    })
  }

  async findByUsername(username: string) {
    return await this.prisma.userEntity.findUnique({
      where: {
        username
      },
      include: {
        userHistory: true
      },
    })
  }

  async resendEmail(userId, actingUser) {
    //TODO: figure out how to make these work without an `any`
    const userCheck: any = await this.prisma.userEntity.findUnique({
      where: {
        id: userId
      },
      include: {
        userHistory: true
      },
    })
    if (userCheck) {
      const createEvent: any = new UserEventsEntity()
      createEvent.target_user_id = userCheck.id;
      createEvent.acting_user_id = actingUser.id;
      createEvent.event = 'Resend Password Reset Email';

      await this.prisma.userEventsEntity.create({
        data: createEvent
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
    const userCheck: any = await this.findByUsername(username);
    if (userCheck) {
      const createEvent: any = new UserEventsEntity()
      //TODO: make these filed updated to something nicer in schema
      createEvent.target_user_id = userCheck.id;
      createEvent.acting_user_id = actingUser.id;
      createEvent.event = 'Password Reset';

      await this.prisma.userEventsEntity.create({
        data: createEvent
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

  async deleteUser(username, actingUser) {
    //TODO: Make this ID based
    const userCheck: any = await this.findByUsername(username);
    if (userCheck) {
      await this.prisma.userEntity.delete({
        where: {username}
      })
      const createEvent: any = new UserEventsEntity()
      //TODO: make these filed updated to something nicer in schema
      createEvent.target_user_id = userCheck.id;
      createEvent.acting_user_id = actingUser.id;
      createEvent.event = 'User Deleted';

      await this.prisma.userEventsEntity.create({
        data: createEvent
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
      return
    }
  }

  async restoreUser(username, actingUser) {
    //TODO: Make this ID based
    const userCheck: any = await this.findByUsername(username);
    if (userCheck.deletedDate) {
      await this.prisma.userEntity.update({
        where: {
          username
        },
        data: {
          deletedDate: null
        }
      })
      const createEvent: any = new UserEventsEntity()
      createEvent.target_user_id = userCheck.id;
      createEvent.acting_user_id = actingUser.id;
      createEvent.event = 'User Restored';

      await this.prisma.userEventsEntity.create({
        data: createEvent
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

  async verifyToken(token) {
    //TODO: Add verify event
    const user: any = await this.findByToken(token);
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

      const createEvent: any = new UserEventsEntity()
      createEvent.target_user_id = user.id;
      createEvent.event = 'Token Verified';
      user.userHistory.push(createEvent);

      await this.prisma.userEventsEntity.create({
        data: createEvent
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

  async createUser(user: CreateUserDto, actingUser) {
    const userCheck = await this.findByUsername(user.username);
    if (!userCheck) {

      const createUser = new UserEntity(user);
      if (!createUser.password) {
        createUser.password = this.generatePassword()
        await this.sendPasswordEmail(createUser.password, createUser.email);
      }
      const userRole: any = new UserRolesEntity();
      //TODO: make this tie to the actual Role
      userRole.role = 'User';
      createUser.userRoles = [userRole];
      createUser.passwordResetNeeded = true
      await this.prisma.userEntity.create({
        data: createUser
      })

      const createEvent: any = new UserEventsEntity()
      createEvent.target_user_id = userCheck.id;
      createEvent.acting_user_id = actingUser.id;
      createEvent.event = 'User Created';

      await this.prisma.userEventsEntity.create({
        data: createEvent
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

      return;
    } else if (!userCheck.emailVerified) {
      throw new HttpException('Please check your email to verify your email address', HttpStatus.FORBIDDEN);
    } else {
      throw new HttpException('Username already exists', HttpStatus.FORBIDDEN)
    }
  }

  async findOneUnsafe(username: string) {
    return await this.prisma.userEntity.findUnique({
      where: {
        username
      },
      include: {
        userRoles: true
      }
    })
  }

  async logIn(username) {
    return await this.prisma.userEntity.update({
      where: {username},
      data: {
        lastLogin: new Date()
      }
    })
  }

  generatePassword() {
    return generatePassword.generate({
      length: 10,
      numbers: true,
      symbols: true
    })
  }

  async sendPasswordEmail(password: string, email: string) {
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
        userRoles: true
      }
    })
    const user = new UserEntity(fetchedUser)
    return classToPlain(user);
  }
}
