import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CryptService} from "../crypt/crypt.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {classToPlain} from "class-transformer";
import {CreateUserDto} from './dto/create-user.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private crypto: CryptService, @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>) {
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

  async createUser(user: CreateUserDto) {
    const userCheck = await this.findByUsername(user.username);
    if (!userCheck) {
      const createUser = new UserEntity(user);
      createUser.roles = ["User"];
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
