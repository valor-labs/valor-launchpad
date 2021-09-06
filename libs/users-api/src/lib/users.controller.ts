import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {RolesGuard} from './roles.guard';
import {Roles} from './roles.decorator';
import {AuthGuard} from '@nestjs/passport';
import {User} from './user.decorator';
import {CreateUser, UserEntity} from '@valor-launchpad/common-api';
import { MessagesService } from './messages/messages.service';
import { NotificationsService } from './notifications/notifications.service';
import { MenuService } from './menus/menu.service';
import { Menu } from '@valor-launchpad/api-interfaces';

@Controller('v1')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private messageService:MessagesService,
    private notificationSerivce:NotificationsService,
    private menuService: MenuService,
  ) {}

  @Get('getRoles')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAvailableRoles() {
    return await this.usersService.getRoles();
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get('current')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getCurrentUsers() {
    return await this.usersService.findCurrent();
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async addUser(@Body() user: CreateUser, @User() actingUser: UserEntity) {
    return await this.usersService.createUser(user, actingUser)
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async deleteUser(@Body() form, @User() actingUser: UserEntity) {
    return await this.usersService.deleteUser(form.username, actingUser)
  }

  @Post('restore')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async restoreUser(@Body() form, @User() actingUser: UserEntity) {
    return await this.usersService.restoreUser(form.username, actingUser);
  }

  @Post('resetPassword')
  async resetPassword(@Body() user, @User() actingUser: UserEntity) {
    return await this.usersService.resetPassword(user.username, actingUser);
  }

  @Post('resendEmail')
  async resendEmail(@Body() user, @User() actingUser: UserEntity) {
    return await this.usersService.resendEmail(user.id, actingUser);
  }

  @Get('messages')
  async getMessages(@Body() user, @User() actingUser: UserEntity){
    return await this.messageService.getMessages(user.id,actingUser)
  }

  @Get('notifications')
  async getNotifications(@Body() user, @User() actingUser: UserEntity){
    return await this.notificationSerivce.getNotifications(user.id,actingUser)
  }

  @Get('menus')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMenus(@User() actingUser: UserEntity): Promise<Menu[]> {
    const currentUserRoles = actingUser.userRoles.map(i => i.role_id);
    return await this.menuService.getMenus(currentUserRoles);
  }
}
