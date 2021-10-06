import { Bind, Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth-guard";
import { RequestWithSession, UserEntity } from "@valor-launchpad/common-api";
import { AuthService } from "./auth.service";
import { Response } from 'express';
import { User } from '@valor-launchpad/users-api';
import { ResponseError, ResponseSuccess } from '@valor-launchpad/common-api';
import { UsersService } from '@valor-launchpad/users-api';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDTO, ResetPasswordDTO, ResetNewPasswordDTO } from './auth.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SEND_EMAIL, SEND_SMS, SendEmailPayload, SendSMSPayload } from './auth-events.constant';


@Controller('v1')
export class AuthController {
  private cookieDomain: string;

  setCookieDomain(val: string) {
    this.cookieDomain = val;
  }

  constructor(private authService: AuthService,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body, @Req() req: RequestWithSession, @Res() response: Response) {
    try {
      const loginResponse = await this.authService.login(body);
      req.session.token = loginResponse.access_token;
      req.session.user = loginResponse.user;
      response.cookie('access_token', loginResponse.access_token, { domain: this.cookieDomain })
      const loginResult = await this.authService.login(body);
      response.send(loginResult);
    } catch (error) {
      console.error(error)
      return new ResponseError('Login Failed', error)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUser(@Req() req: RequestWithSession, @User() currentUser: UserEntity, @Res() response: Response) {
    console.log(currentUser);
    if (req.session && req.session.user) {
      response.send(req.session.user);
    } else {
      response.status(HttpStatus.OK).send(null)
    }
  }

  @Get('sign-out')
  async signOut(@Req() req: RequestWithSession, @User() currentUser: UserEntity, @Res() response: Response) {
    console.log(currentUser);
    req.session.destroy();
    response.clearCookie('access_token');
    response.status(HttpStatus.OK).send({ status: 'logout successful' });
  }

  @Get('verify-user/:token')
  @Bind(Param('token'))
  async verifyUser(token) {
    try {
      const verifiedAccount = await this.usersService.verifyToken(token);
      return new ResponseSuccess('Verification Successful')
    } catch (error) {
      console.error(error)
      return new ResponseError('Verification Failed', error)
    }
  }

  @Post('register')
  async register(@Body() createUser: RegisterDTO) {
    const createdUser = await this.authService.register(createUser);
    if (createUser.phone) {
      this.eventEmitter.emit(SEND_SMS, new SendSMSPayload(createdUser.phone, createdUser.phoneVerifyToken));
    }
    if (createdUser.email) {
      this.eventEmitter.emit(SEND_EMAIL, new SendEmailPayload(createdUser.email, createdUser.emailVerifyToken));
    }
    return { username: createdUser.username };
  }

  @Get('verify-username')
  async verifyUsername(@Query('username') username: string): Promise<{ existedUsername: boolean }> {
    return { existedUsername: await this.usersService.verifyUsername(username) };
  }

  @Post('update-password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(@User() user: UserEntity, @Body() body: ResetPasswordDTO) {
    await this.authService.updatePassword(user.username, body.oldPassword, body.newPassword);
    return {};
  }

  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Req() req: RequestWithSession, @User() user: UserEntity, @Body() body: ResetNewPasswordDTO) {
    const { username, password } = body;

    if (user.username !== username) {
      return new ResponseError('Incorrect User Name');
    }

    try {
      const user = await this.authService.resetPassword(username, password);
      
      Object.assign(req.session.user, user);

      return new ResponseSuccess('Reset Password Success');
    } catch (error) {
      return new ResponseError('Reset Password Failed', error)
    }
  }

  //TODO: add forgot password
}
