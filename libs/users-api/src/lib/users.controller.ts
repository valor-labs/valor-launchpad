import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import {UsersService} from './users.service';
import {RolesGuard} from './roles.guard';
import {Roles} from './roles.decorator';
import {AuthGuard} from '@nestjs/passport';
import {User} from './user.decorator';
import { RequestWithSession, ResponseError, ResponseSuccess } from '@valor-launchpad/common-api';
import { MessagesService } from './messages/messages.service';
import { MenuService } from './menus/menu.service';
import { Menu, RequestingUser } from '@valor-launchpad/api-interfaces';
import { UserListLine } from '@valor-launchpad/api-interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { TagsService } from './tags/tags.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { QueryUserListDto } from './dto/query-user-list.dto';
import { DeleteUsersDto } from './dto/delete-users.dto';
import { RestoreUsersDto } from './dto/restore-users.dto';
import { BatchAddTagsDto } from './dto/batch-add-tags.dto';

@Controller('v1')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private messageService:MessagesService,
    private menuService: MenuService,
    private tagsService: TagsService
  ) {}

  @Get('getRoles')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAvailableRoles() {
    return await this.usersService.getRoles();
  }

  @Get('tags')
  @UseGuards(AuthGuard('jwt'))
  getAvailableTags() {
    return this.tagsService.findAll();
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAllUsers(@Query() query: QueryUserListDto): Promise<UserListLine[]> {
    return await this.usersService.findAll(query);
  }

  @Get('byName')
  @UseGuards(AuthGuard('jwt'))
  getUsersByName(@Query('keyword') keyword: string) {
      return this.usersService.findByName(keyword);
  }

  // @Get('current')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async getCurrentUsers() {
  //   return await this.usersService.findCurrent();
  // }

  @Post('add')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async addUser(@Body() user: CreateUserDto, @User() actingUser: RequestingUser) {
    return await this.usersService.createUser(user, actingUser)
  }

  @Post('edit')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async editUser(@Body() user: EditUserDto, @User() actingUser: RequestingUser) {
    return await this.usersService.editUser(user, actingUser);
  }

  @Post('batchDelete')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async deleteUsers(@Body() body: DeleteUsersDto, @User() actingUser: RequestingUser) {
    return await this.usersService.deleteUsers(body.userIds, actingUser);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin','user')
  async deleteUser(@Body() form, @User() actingUser: RequestingUser) {
    try {
      await this.usersService.deleteUser(form.username, actingUser);
      return new ResponseSuccess('Deleted Account success');
    } catch (e) {
      return new ResponseError('Deleted Account Failed');
    }
  }

  @Post('batchRestore')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async restoreUsers(@Body() body: RestoreUsersDto, @User() actingUser: RequestingUser) {
    return await this.usersService.restoreUsers(body.userIds, actingUser);
  }

  @Post('restore')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async restoreUser(@Body() form, @User() actingUser: RequestingUser) {
    return await this.usersService.restoreUser(form.username, actingUser);
  }

  @Post('resetPassword')
  @UseGuards(AuthGuard('jwt'), ThrottlerGuard)
  async resetPassword(@Body() user, @User() actingUser: RequestingUser) {
    return await this.usersService.sendResetPasswordMail(user.username, actingUser);
  }

  @Post('resendEmail')
  @UseGuards(AuthGuard('jwt'))
  async resendEmail(@Body() user, @User() actingUser: RequestingUser) {
    return await this.usersService.resendEmail(user.id, actingUser);
  }

  @Get('messages')
  async getMessages(@Body() user, @User() actingUser: RequestingUser){
    return await this.messageService.getMessages(user.id,actingUser)
  }

  @Get('menus')
  async getMenus(@Req() req: RequestWithSession, @User() actingUser: RequestingUser): Promise<Menu[]> {
    const currentUserRoles = req.session.user.userRoles.map(i => i.role_id);
    return await this.menuService.getMenus(currentUserRoles);
  }

  @Post('batchAddTags')
  @UseGuards(AuthGuard('jwt'))
  async batchAddTags(@Body() batchAddTagsDto: BatchAddTagsDto) {
    return await this.usersService.batchAddTags(batchAddTagsDto);
  }
}
