import {HttpException, HttpStatus, Inject, Injectable, Scope} from '@nestjs/common';
import {CryptService} from "../crypt/crypt.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {classToPlain} from "class-transformer";
import {CreateUserDto} from './dto/create-user.dto';
import {RolesEntity} from './roles.entity';
import {UserRolesEntity} from './user-roles.entity';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable({scope: Scope.REQUEST})
export class UsersService {
  constructor(private crypto: CryptService,
              @InjectRepository(UserRolesEntity) private userRolesRepository: Repository<UserRolesEntity>,
              @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {
  }

  async findByToken(token: string) {
    //TODO: this needs to be changed when we have more than one type of token and its extracted to its own table
    return await this.userRepository.findOne({emailVerifyToken: token})
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({username: username})
  }

  //TODO: Verify this
  async deleteUser(username) {
    const userCheck = await this.findByUsername(username);
    if (userCheck) {
      return await this.userRepository.softDelete(userCheck);
    }
  }

  //TODO: Verify this
  async restoreUser(username) {
    const userCheck = await this.findByUsername(username);
    if (userCheck.deletedDate) {
      return await this.userRepository.restore(userCheck);
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
      const userRole = new UserRolesEntity();
      //TODO: make this tie to the actual Role
      userRole.role = 'User';
      createUser.userRoles = [userRole];
      //TODO: add this back after user Roles is fixed
      // createUser.roles = ["User"];
      return await this.userRepository.save(createUser);
    } else if (!userCheck.emailVerified) {
      throw new HttpException('Please check your email to verify your email address', HttpStatus.FORBIDDEN);
    } else {
      throw new HttpException('Username already exists', HttpStatus.FORBIDDEN)
    }
  }

  async findOneUnsafe(username: string) {
    return await this.userRepository.findOne({where: {username}})
  }

  logIn(username) {
    this.userRepository.createQueryBuilder()
      .update(UserEntity)
      .set({lastLogin: new Date()})
      .where("username =:username", {username})
      .execute();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = new UserEntity(await this.userRepository.findOne({where: {username}}))
    return classToPlain(user);
  }
}
