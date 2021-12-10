import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@valor-launchpad/users-api';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { ResponseError, ResponseSuccess } from '@valor-launchpad/common-api';
import { TermsOfUseService } from './terms-of-use.service';
import { CreateTermsOfUseDTO } from './terms-of-use.dto';
import { RequestingUser } from '@valor-launchpad/api-interfaces';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class TermsOfUseController {
  constructor(private termsOfUseService: TermsOfUseService) {}

  @Get('terms-of-use-list')
  async getTermsOfUseList() {
    try {
      const termsOfUseList = await this.termsOfUseService.fetchTermsOfUseList();

      return new ResponseSuccess(
        'Get User Terms Of Use List Success',
        termsOfUseList
      );
    } catch (error) {
      return new ResponseError('Get User Terms Of Use List Failed', error);
    }
  }

  @Post('create-terms-of-use')
  async createTermsOfUse(
    @User() user: RequestingUser,
    @Body() body: CreateTermsOfUseDTO
  ) {
    try {
      await this.termsOfUseService.createTermsOfUse({
        createdUserId: user.id,
        ...body,
      });

      return new ResponseSuccess('Create User Terms Of Use Success');
    } catch (error) {
      return new ResponseError('Create User Terms Of Use Failed', error);
    }
  }

  @Get('user-terms-of-use')
  async getTermsOfUse(@User() user: RequestingUser) {
    try {
      const isAcceptTermsOfUse = await this.termsOfUseService.getUserTermsOfUse(
        user.id
      );

      return new ResponseSuccess(
        'Get User Terms Of Use Success',
        isAcceptTermsOfUse
      );
    } catch (error) {
      return new ResponseError('Get User Terms Of Use Failed', error);
    }
  }

  @Get('latest-terms-of-use')
  async getLatestTermsOfUse() {
    try {
      const latestTermsOfUse =
        await this.termsOfUseService.fetchLatestTermsOfUse();

      if (!latestTermsOfUse) {
        throw new HttpException('No Terms of use found', HttpStatus.NOT_FOUND);
      }

      return new ResponseSuccess(
        'Get Latest Terms Of Use Success',
        latestTermsOfUse
      );
    } catch (error) {
      return new ResponseError('Get Latest Terms Of Use Failed', error);
    }
  }

  @Post('accept-terms-of-use')
  async acceptTermsOfUse(@User() user: RequestingUser) {
    try {
      await this.termsOfUseService.acceptTermsOfUse(user?.id);

      return new ResponseSuccess('Accept User Terms Of Use Success');
    } catch (error) {
      return new ResponseError('Accept User Terms Of Use Failed', error);
    }
  }
}
