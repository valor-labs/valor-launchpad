import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import { MessagesService } from './messages/messages.service';
import { NotificationsService } from './notifications/notifications.service';
import {CryptService} from '@valor-launchpad/common-api';
import {UsersController} from './users.controller';
import {RolesGuard} from './roles.guard';
import {EmailModule} from '@valor-launchpad/email';
import {PrismaService} from '@valor-launchpad/prisma';
import { MenuService } from './menus/menu.service';
import { UsersEventsService } from './users-events.service';

@Module({
  imports: [
    EmailModule
  ],
  providers: [UsersService,MessagesService, NotificationsService,CryptService, RolesGuard, PrismaService, MenuService, UsersEventsService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersApiModule {
}
