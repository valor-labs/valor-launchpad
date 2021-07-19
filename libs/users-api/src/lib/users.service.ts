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
    return await this.userRepository.findOne({username: username}, {withDeleted: true})
  }

  async deleteUser(username) {
    //TODO: Add delete event
    const userCheck = await this.findByUsername(username);
    if (userCheck) {
      await this.userRepository.softDelete({username});
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

  async restoreUser(username) {
    //TODO: Add restore event
    const userCheck = await this.findByUsername(username);
    if (userCheck.deletedDate) {

      await this.userRepository.restore({username});

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
      return await this.userRepository.save(user)
    } else {
      throw new HttpException('Token does not exist', HttpStatus.NOT_FOUND)
    }
  }

  async createUser(user: CreateUserDto, activeUser) {
    const userCheck = await this.findByUsername(user.username);
    if (!userCheck) {
      const createUser = new UserEntity(user);
      if (!createUser.password) {
        createUser.password = generatePassword.generate({
          length: 10,
          numbers: true,
          symbols: true
        })
        //TODO: Move this to a template that is generated and saved in database and used from that
        await this.emailService.sendEmail({
          to: user.email,
          from: 'zack.chapple@valor-software.com',
          subject: 'Your Initial Password',
          text: 'Reset your password here',
          html: '<strong>Your Initial Password</strong><br><br>' +
            `${createUser.password}
          <br>
          <br>
          Or, copy and paste the following URL into your browser:
          <span>http://localhost:4200/login}</span>`,
        })
      }
      const userRole = new UserRolesEntity();
      //TODO: make this tie to the actual Role
      userRole.role = 'User';
      createUser.userRoles = [userRole];

      const createEvent = new UserEventsEntity()
      createEvent.targetUser = createUser;
      createEvent.event = 'User Created';
      createEvent.actingUser = activeUser;
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

  async findOne(username: string): Promise<User | undefined> {
    const user = new UserEntity(await this.userRepository.findOne({where: {username}, relations: ['userRoles']}))
    return classToPlain(user);
  }
}
