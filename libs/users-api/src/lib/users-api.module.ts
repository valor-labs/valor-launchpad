import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {CryptService} from '@valor-launchpad/common-api';
import {UserSubscriber} from './user.entity';
import {UsersController} from './users.controller';
import {RolesGuard} from './roles.guard';
import {EmailModule} from '@valor-launchpad/email';
import {PrismaService} from '@valor-launchpad/prisma';

@Module({
  imports: [
    EmailModule
  ],
  providers: [UsersService, UserSubscriber, CryptService, RolesGuard, PrismaService],
  controllers: [UsersController],
  exports: [UsersService, UserSubscriber]
})
export class UsersApiModule {
}
