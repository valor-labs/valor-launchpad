import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProfileEntity} from "./profile.entity";
import {ActivityEntity} from "./activity.entity";
import {UsersApiModule} from "@valor-launchpad/users-api";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, ActivityEntity]), UsersApiModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
