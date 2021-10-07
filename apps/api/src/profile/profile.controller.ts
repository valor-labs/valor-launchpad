
import {User} from '@valor-launchpad/users-api';
import {UserEntity} from '@valor-launchpad/common-api';
import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UsersService } from '@valor-launchpad/users-api';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploaderUtility } from '../media/imageUploader.utility';
import { MediaService } from '../media/media.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';


@Controller('v1')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UsersService,
    private mediaService: MediaService
  ) {
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

