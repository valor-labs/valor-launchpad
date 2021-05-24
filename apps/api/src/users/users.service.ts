import {Injectable} from '@nestjs/common';
import {CryptService} from "../crypt/crypt.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {classToPlain} from "class-transformer";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private crypto: CryptService, @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>) {
  }

  async createUser(user) {
    const newUser = Object.assign({},user)
    newUser.password = await this.crypto.hashPassword(newUser.password)
  }

  async findOneUnsafe(username:string){
    return await this.userRepository.findOne({where: {username}})
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = new UserEntity(await this.userRepository.findOne({where: {username}}))
    return classToPlain(user);
  }
}
