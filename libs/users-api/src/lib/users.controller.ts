import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {UsersService} from './users.service';
import {RolesGuard} from './roles.guard';
import {Roles} from './roles.decorator';
import {AuthGuard} from '@nestjs/passport';
import {User} from './user.decorator';
import { CreateUser, RequestWithSession, UserEntity } from '@valor-launchpad/common-api';
import { MessagesService } from './messages/messages.service';
import { NotificationsService } from './notifications/notifications.service';
import { MenuService } from './menus/menu.service';
import { Menu } from '@valor-launchpad/api-interfaces';
import { UserListLine } from '@valor-launchpad/api-interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

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
  async getAllUsers(): Promise<UserListLine[]> {
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
  async addUser(@Body() user: CreateUserDto, @User() actingUser: UserEntity) {
    return await this.usersService.createUser(user, actingUser)
  }

  @Post('edit')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async editUser(@Body() user: EditUserDto, @User() actingUser: UserEntity) {
    return await this.usersService.editUser(user, actingUser);
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
  @UseGuards(AuthGuard('jwt'))
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
  async getMenus(@Req() req: RequestWithSession, @User() actingUser: UserEntity): Promise<Menu[]> {
    const currentUserRoles = req.session.user.userRoles.map(i => i.role_id);
    return await this.menuService.getMenus(currentUserRoles);
  }
}
