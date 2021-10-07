import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
// import {JwtAuthGuard} from "@valor-launchpad/auth-api";
import { UsersService } from '@valor-launchpad/users-api';
import { User } from '@valor-launchpad/users-api';
import { RequestWithSession, UserEntity } from '@valor-launchpad/common-api';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileEntity } from './profile.entity';
import { ImageUploaderUtility } from '../media/imageUploader.utility';
import { MediaService } from '../media/media.service';


@Controller('v1')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UsersService,
    private mediaService: MediaService
  ) {
  }

  @Get()
  async defaultProfile(@Req() req: RequestWithSession) {
    return await this.profileService.getProfile(req.session.user.username);
  }

  @Get('myProfile')
  async getProfile(@User() user: UserEntity) {
    return await this.userService.findOne(user.username);
  }



  @Post('updateProfile')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: ImageUploaderUtility.getStorageOptions()
    })
  )
  async updatePublicInfoProfile(@UploadedFile() file, @Body() profileBody: { profileId: string, username: string, alt: string }) {
    const originImgPath = file.path;
    const imgType = file.mimetype;
    const webpSrc = await ImageUploaderUtility.imageToWebp(file);
    const targetId = profileBody.profileId;
    const newName = profileBody.username;
    await this.profileService.updateProfileName(targetId, newName);
    return await this.mediaService.updateProfileImg(
      originImgPath.split('/').pop(),
      webpSrc.split('/').pop(),
      profileBody.alt,
      imgType,
      targetId
    );
  }


}

