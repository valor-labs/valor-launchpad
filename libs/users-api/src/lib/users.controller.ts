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
  async addUser(@Body() user, @User() actingUser:UserEntity) {
    return await this.usersService.createUser(user, actingUser)
  }

  @Post('delete')
  @Roles('admin')
  async deleteUser(@Body() user, @User() actingUser:UserEntity) {
    return await this.usersService.deleteUser(user.username, actingUser)
  }

  @Post('restore')
  @Roles('admin')
  async restoreUser(@Body() user, @User() actingUser:UserEntity) {
    return await this.usersService.restoreUser(user.username, actingUser);
  }

  @Post('resetPassword')
  @Roles('admin')
  async resetPassword(@Body() user, @User() actingUser:UserEntity) {
    return await this.usersService.resetPassword(user.username, actingUser);
  }

  @Post('resendEmail')
  @Roles('admin')
  async resendEmail(@Body() user, @User() actingUser:UserEntity) {
    return await this.usersService.resendEmail(user.id, actingUser);
  }
}
