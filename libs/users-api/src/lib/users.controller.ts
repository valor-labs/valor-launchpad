import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {RolesGuard} from './roles.guard';
import {Roles} from './roles.decorator';
import {AuthGuard} from '@nestjs/passport';
import {UserEntity} from '@valor-launchpad/users-api';
import {User} from './user.decorator';

@Controller('v1')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get('all')
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get('current')
  async getCurrentUsers() {
    return await this.usersService.findCurrent();
  }

  @Post('add')
  @Roles('admin')
  async addUser(@Body() user, @User() activeUser:UserEntity) {
    return await this.usersService.createUser(user, activeUser)
  }

  @Post('delete')
  @Roles('admin')
  async deleteUser(@Body() user) {
    return await this.usersService.deleteUser(user.username)
  }

  @Post('restore')
  @Roles('admin')
  async restoreUser(@Body() user) {
    return await this.usersService.restoreUser(user.username);
  }

  @Post('resetPassword')
  @Roles('admin')
  async resetPassword(@Body() user) {
    return await this.usersService.resetPassword(user.username);
  }
}
