import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UsersApiModule } from '@valor-launchpad/users-api';
import { PrismaModule } from '@valor-launchpad/prisma';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [UsersApiModule, PrismaModule, MediaModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
