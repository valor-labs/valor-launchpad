import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CryptService} from '@valor-launchpad/common-api';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {classToPlain} from 'class-transformer';
import {CreateUserDto} from './dto/create-user.dto';
import {UserRolesEntity} from './user-roles.entity';
import {EmailService} from '@valor-launchpad/email';
import * as generatePassword from 'generate-password';
import {UserEventsEntity} from './user.events.entity';
import {EventEmitter2} from '@nestjs/event-emitter';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private crypto: CryptService,
              private emailService: EmailService,
              private eventEmitter: EventEmitter2,
              @InjectRepository(UserRolesEntity) private userRolesRepository: Repository<UserRolesEntity>,
              @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {
  }

  //TODO: Add profile image function

  async findByToken(token: string) {
    //TODO: this needs to be changed when we have more than one type of token and its extracted to its own table
    return await this.userRepository.findOne({emailVerifyToken: token})
  }

  async findAll() {
    //Todo: this eventually needs to filter password field
    return await this.userRepository.find({
      relations: ['userRoles', 'userTags', 'userHistory', 'userHistory.actingUser'],
      withDeleted: true
    });
  }

  async findCurrent() {
    //Todo: this eventually needs to filter password field
    return await this.userRepository.find({relations: ['userRoles', 'userTags', 'userHistory']});
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({username: username}, {withDeleted: true, relations: ['userHistory']})
  }

  async resendEmail(userId, actingUser) {
    const userCheck = await this.userRepository.findOne({id:userId}, { relations: ['userHistory']})
    if (userCheck) {
      const createEvent = new UserEventsEntity()
      createEvent.targetUser = userCheck;
      createEvent.actingUser = actingUser;
      createEvent.event = 'Resend Password Reset Email';

      if (typeof userCheck.userHistory === 'undefined') {
        userCheck.userHistory = []
      }
      userCheck.password = this.generatePassword();
      userCheck.passwordResetNeeded = true;
      userCheck.userHistory = [...userCheck.userHistory, createEvent];

      await this.sendPasswordEmail(userCheck.password, userCheck.email);

      await this.userRepository.save(userCheck);
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
      const createEvent = new UserEventsEntity()
      createEvent.targetUser = userCheck;
      createEvent.actingUser = actingUser;
      createEvent.event = 'Password Reset';

      if (typeof userCheck.userHistory === 'undefined') {
        userCheck.userHistory = []
      }
      userCheck.password = this.generatePassword();
      userCheck.passwordResetNeeded = true;
      userCheck.userHistory = [...userCheck.userHistory, createEvent];

      await this.sendPasswordEmail(userCheck.password, userCheck.email);

      await this.userRepository.save(userCheck);
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
    const userCheck = await this.findByUsername(username);
    if (userCheck) {
      await this.userRepository.softDelete({username});
      const deletedUser = await this.userRepository.findOne({username}, {withDeleted: true, relations: ['userHistory']})
      const createEvent = new UserEventsEntity()
      createEvent.targetUser = userCheck;
      createEvent.actingUser = actingUser;
      createEvent.event = 'User Deleted';
      if (typeof deletedUser.userHistory === 'undefined') {
        deletedUser.userHistory = []
      }
      deletedUser.userHistory.push(createEvent);

      await this.userRepository.save(deletedUser);

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
    const userCheck = await this.findByUsername(username);
    if (userCheck.deletedDate) {

      await this.userRepository.restore({username});
      const restoredUser = await this.findByUsername(username);
      const createEvent = new UserEventsEntity()
      createEvent.targetUser = userCheck;
      createEvent.actingUser = actingUser;
      createEvent.event = 'User Restored';
      if (typeof restoredUser.userHistory === 'undefined') {
        restoredUser.userHistory = []
      }
      restoredUser.userHistory.push(createEvent);

      await this.userRepository.save(restoredUser)

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
    const user = await this.findByToken(token);
    if (user) {
      user.emailVerified = true;
      //TODO: the emailVerifyToken needs to be removed so verification cannot be done more than once
      //TODO: verification should have expiration time
      //TODO: verification should have resend if expired
      //TODO: Add resend email if they didn't receive the email

      const createEvent = new UserEventsEntity()
      createEvent.targetUser = user;
      createEvent.event = 'Token Verified';
      user.userHistory.push(createEvent);

      await this.userRepository.save(user)

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
      const userRole = new UserRolesEntity();
      //TODO: make this tie to the actual Role
      userRole.role = 'User';
      createUser.userRoles = [userRole];
      createUser.passwordResetNeeded = true;
      const createEvent = new UserEventsEntity()
      createEvent.targetUser = createUser;
      createEvent.event = 'User Created';
      createEvent.actingUser = actingUser;
      createUser.userHistory = [createEvent];
      await this.userRepository.save(createUser);
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
    return await this.userRepository.findOne({where: {username}, relations: ['userRoles']})
  }

  logIn(username) {
    this.userRepository.createQueryBuilder()
      .update(UserEntity)
      .set({lastLogin: new Date()})
      .where('username =:username', {username})
      .execute();
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
    const user = new UserEntity(await this.userRepository.findOne({where: {username}, relations: ['userRoles']}))
    return classToPlain(user);
  }
}
