import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {CryptService} from "../crypt/crypt.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity, UserSubscriber} from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UserSubscriber ,CryptService],
  exports: [UsersService, UserSubscriber],
})
export class UsersModule {
}
