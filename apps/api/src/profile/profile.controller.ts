import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import {ProfileService} from "./profile.service";
// import {JwtAuthGuard} from "@valor-launchpad/auth-api";
import {UsersService} from "@valor-launchpad/users-api";
import {User} from '@valor-launchpad/users-api';
import {RequestWithSession, UserEntity} from '@valor-launchpad/common-api';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { FileInterceptor } from '@nestjs/platform-express';
import { Project } from '@api/projects';
import { ProfileEntity } from './profile.entity';


@Controller('v1')
export class ProfileController {
  constructor(private profileService: ProfileService, private userService: UsersService) {
  }

  @Get()
  async defaultProfile(@Req() req: RequestWithSession) {
    return await this.profileService.getProfile(req.session.user.username)
  }

  @Get('myProfile')
  async getProfile(@User() user: UserEntity) {
    return await this.userService.findOne(user.username)
  }

  @Post('updateProfile')
  @UseInterceptors(
    FileInterceptor('image'),
  )
  async updateProfile(@UploadedFile() file, @Body() createProjectDto: ProfileEntity) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }


}

