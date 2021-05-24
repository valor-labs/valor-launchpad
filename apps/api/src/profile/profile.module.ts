import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProfileEntity} from "./profile.entity";
import {ActivityEntity} from "./activity.entity";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, ActivityEntity]), UsersModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
