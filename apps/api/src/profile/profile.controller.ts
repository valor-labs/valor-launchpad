import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {JwtAuthGuard} from "@valor-launchpad/auth-api";
import {RequestWithSession} from "@valor-launchpad/common-api";
import {UsersService} from "@valor-launchpad/users-api";

@UseGuards(JwtAuthGuard)
@Controller('v1')
export class ProfileController {
  constructor(private profileService: ProfileService, private userService: UsersService) {

  }

  @Get()
  async defaultProfile() {
    return await this.profileService.getProfile()
  }

  @UseGuards(JwtAuthGuard)
  @Get('myProfile')
  async getProfile(@Req() req: RequestWithSession) {
    const session = req.session.user;
    return await this.userService.findOne(session.username)
  }
}

