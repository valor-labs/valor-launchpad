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
  async updateProfile(@UploadedFile() file, @Body() profileBody: { alt: string, profileId: string }) {
    const originImgPath = file.path;
    const imgType = file.mimetype;
    const webpSrc = await ImageUploaderUtility.imageToWebp(file);
    console.log('🍎');
    console.log('originImgPath', originImgPath);
    console.log('webpSrc', webpSrc);
    console.log('alt',  profileBody.alt);
    console.log('imgType', imgType);
    console.log('profileId',   profileBody.profileId);
    console.log('🍎');
    return await this.mediaService.updateProfileImg(
      originImgPath.split('/').pop(),
      webpSrc.split('/').pop(),
      profileBody.alt,
      imgType,
      profileBody.profileId
    );
  }


}

