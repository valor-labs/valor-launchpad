import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {CryptService} from '@valor-launchpad/common-api';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity, UserSubscriber} from './user.entity';
import {UserRolesEntity} from './user-roles.entity';
import {RolesEntity} from './roles.entity';
import {UserTagsEntity} from './user-tags.entity';
import {UsersController} from './users.controller';
import {UserEventsEntity} from './user.events.entity';
import {RolesGuard} from './roles.guard';
import {EmailModule} from '@valor-launchpad/email';
import {PrismaService} from '@valor-launchpad/prisma';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRolesEntity, RolesEntity, UserTagsEntity, UserEventsEntity]),
    EmailModule
  ],
  providers: [UsersService, UserSubscriber, CryptService, RolesGuard, PrismaService],
  controllers: [UsersController],
  exports: [UsersService, UserSubscriber]
})
export class UsersApiModule {
}
