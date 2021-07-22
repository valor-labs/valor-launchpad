import {Controller, Get, UseGuards} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {JwtAuthGuard} from "@valor-launchpad/auth-api";
import {UserEntity, UsersService} from "@valor-launchpad/users-api";
import {User} from '@valor-launchpad/users-api';

@UseGuards(JwtAuthGuard)
@Controller('v1')
export class ProfileController {
  constructor(private profileService: ProfileService, private userService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async defaultProfile(@User() user: UserEntity) {
    return await this.profileService.getProfile(user.username)
  }

  @UseGuards(JwtAuthGuard)
  @Get('myProfile')
  async getProfile(@User() user: UserEntity) {
    return await this.userService.findOne(user.username)
  }
}

