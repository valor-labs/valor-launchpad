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

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private crypto: CryptService,
              private emailService: EmailService,
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
    return await this.userRepository.find({relations: ['userRoles', 'userTags', 'userHistory'], withDeleted: true});
  }

  async findCurrent() {
    //Todo: this eventually needs to filter password field
    return await this.userRepository.find({relations: ['userRoles', 'userTags', 'userHistory']});
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({username: username}, {withDeleted: true})
  }

  async deleteUser(username) {
    const userCheck = await this.findByUsername(username);
    if (userCheck) {
      return await this.userRepository.softDelete({username});
    }
  }

  async restoreUser(username) {
    const userCheck = await this.findByUsername(username);
    if (userCheck.deletedDate) {
      return await this.userRepository.restore({username});
    }
  }

  async verifyToken(token) {
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

  async createUser(user: CreateUserDto) {
    const userCheck = await this.findByUsername(user.username);
    if (!userCheck) {
      const createUser = new UserEntity(user);
      if (!createUser.password) {
        createUser.password = generatePassword.generate({
          length:10,
          numbers:true,
          symbols:true
        })
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
      //TODO: add this back after user Roles is fixed
      // createUser.roles = ['User'];
      await this.userRepository.save(createUser);
      //TODO: Set password reset token / methods
      //TODO: Email the user their initial password
      //TODO:
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
