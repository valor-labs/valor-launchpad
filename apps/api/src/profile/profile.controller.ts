import { User } from '@valor-launchpad/users-api';
import { ResponseError } from '@valor-launchpad/common-api';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UsersService } from '@valor-launchpad/users-api';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploaderUtility } from '../media/imageUploader.utility';
import { MediaService } from '../media/media.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { PrismaService } from '@valor-launchpad/prisma';
import { updatePublicInfoProfileDto } from './dto/update-public-info-profile.dto';
import { updatePrivateInfoProfileDto } from './dto/update-private-info-profile.dto';
import { Response } from 'express';
import { ProfileVo, RequestingUser } from '@valor-launchpad/api-interfaces';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UsersService,
    private mediaService: MediaService,
    private prisma: PrismaService
  ) {}

  /**
   * Get user's profile data through username
   * @param user: acting user
   * @param username: if username is nil, return acting user's profile
   */
  @Get()
  async defaultProfile(
    @User() user: RequestingUser,
    @Query('username') username: string
  ): Promise<ProfileVo> {
    return await this.profileService.getProfile(
      username ?? user.username,
      user
    );
  }

  @Get('myProfile')
  async getProfile(@User() user: RequestingUser) {
    return await this.userService.findOne(user.username);
  }

  @Post('updateProfile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: ImageUploaderUtility.getStorageOptions(),
    })
  )
  async updatePublicInfoProfile(
    @UploadedFile() file,
    @Body() profileBody: updatePublicInfoProfileDto,
    @Res() response: Response
  ) {
    const originImgPath = file.path;
    const imgType = file.mimetype;
    const webpSrc = await ImageUploaderUtility.imageToWebp(file);
    const targetId = profileBody.profileId;
    const username = profileBody.username;
    const bio = profileBody.bio;
    try {
      await this.prisma.$transaction([
        this.profileService.updateProfileName(targetId, username, bio),
        this.mediaService.updateProfileImg(
          originImgPath.split('/').pop(),
          webpSrc.split('/').pop(),
          profileBody.alt,
          imgType,
          targetId
        ),
      ]);
      response.send(await this.userService.findOne(username));
    } catch (e) {
      console.error(e.toString());
      return response.send(
        new ResponseError('update profile failed', e.toString())
      );
    }
  }

  @Post('updatePrivateProfile')
  async updatePrivateInfoProfile(
    @Body() privateProfileBody: updatePrivateInfoProfileDto
  ) {
    const profileId = privateProfileBody.profileId;
    const firstName = privateProfileBody.firstName;
    const lastName = privateProfileBody.lastName;
    const email = privateProfileBody.email;
    const address = privateProfileBody.address;
    const address2 = privateProfileBody.address2;
    const city = privateProfileBody.city;
    const zip = privateProfileBody.zip;
    const language = privateProfileBody.language;
    const locale = privateProfileBody.locale;
    const timezone = privateProfileBody.timezone;

    return await this.profileService.updatePrivateProfile(
      profileId,
      firstName,
      lastName,
      email,
      address,
      address2,
      city,
      zip,
      language,
      locale,
      timezone
    );
  }
}
