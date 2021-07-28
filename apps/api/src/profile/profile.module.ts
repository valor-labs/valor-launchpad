import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {UsersApiModule} from "@valor-launchpad/users-api";
import {PrismaModule} from '@valor-launchpad/prisma';

@Module({
  imports: [ UsersApiModule, PrismaModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
