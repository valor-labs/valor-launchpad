import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {CryptService} from "../crypt/crypt.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, CryptService],
  exports: [UsersService],
})
export class UsersModule {
}
