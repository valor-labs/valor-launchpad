import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {RolesGuard} from './roles.guard';
import {Roles} from './roles.decorator';
import {AuthGuard} from '@nestjs/passport';
import {UserEntity} from '@valor-launchpad/users-api';
import {User} from './user.decorator';

@Controller('v1')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

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
  async addUser(@Body() user, @User() actingUser: UserEntity) {
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
}