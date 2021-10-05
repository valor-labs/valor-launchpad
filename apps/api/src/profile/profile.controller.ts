import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {JwtAuthGuard} from "@valor-launchpad/auth-api";
import {UsersService} from "@valor-launchpad/users-api";
import {User} from '@valor-launchpad/users-api';
import {UserEntity} from '@valor-launchpad/common-api';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService, private userService: UsersService) {
  }


  /**
   * Get user's profile data through username
   * @param user: acting user
   * @param username: if username is nil, return acting user's profile
   */
  @Get()
  async defaultProfile(@User() user: UserEntity, @Query('username') username: string) {
    return await this.profileService.getProfile(username ?? user.username, user)
  }

  @Get('myProfile')
  async getProfile(@User() user: UserEntity) {
    return await this.userService.findOne(user.username)
  }
}

