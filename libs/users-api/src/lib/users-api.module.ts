import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {CryptService} from '@valor-launchpad/common-api';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity, UserSubscriber} from './user.entity';
import {UserRolesEntity} from './user-roles.entity';
import {RolesEntity} from './roles.entity';
import {UserTagsEntity} from './user-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRolesEntity, RolesEntity, UserTagsEntity])],
  providers: [UsersService, UserSubscriber ,CryptService],
  exports: [UsersService, UserSubscriber]
})
export class UsersApiModule {
}
