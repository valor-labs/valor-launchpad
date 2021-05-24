import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RequestWithSession} from "../common/RequestWithSession";
import {UsersService} from "../users/users.service";

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

