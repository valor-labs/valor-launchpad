import { Bind, Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UseGuards, ValidationPipe } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth-guard";
import { RequestWithSession, UserEntity } from "@valor-launchpad/common-api";
import { AuthService } from "./auth.service";
import { Response } from 'express';
import { User } from '@valor-launchpad/users-api';
import { ResponseError, ResponseSuccess } from '@valor-launchpad/common-api';
import { UsersService } from '@valor-launchpad/users-api';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDTO, ResetPasswordDTO, ResetNewPasswordDTO, RefreshTokenDTO } from './auth.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SEND_EMAIL, SEND_SMS, SendEmailPayload, SendSMSPayload } from './auth-events.constant';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';


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
      response.send(loginResponse);
    } catch (error) {
      console.error(error)
      response.send(new ResponseError('Login Failed', error));
    }
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDTO, @User() user: UserEntity, @Req() req: RequestWithSession, @Res() response: Response) {
    const refreshResult = await this.authService.refreshToken(user.id, body.refresh_token);
    req.session.token = refreshResult.access_token;
    req.session.user = refreshResult.user;
    response.cookie('access_token', refreshResult.access_token, { domain: this.cookieDomain })
    response.send(refreshResult);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUser(@Req() req: RequestWithSession, @User() currentUser: UserEntity, @Res() response: Response) {
    if (req.session && req.session.user) {
      response.send(req.session.user);
    } else {
      response.status(HttpStatus.OK).send(null)
    }
  }

  @Get('sign-out')
  async signOut(@Req() req: RequestWithSession, @User() currentUser: UserEntity, @Res() response: Response) {
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

  @Get('verify-password-reset/:token')
  @Bind(Param('token'))
  async verifyPasswordReset(token, @Req() req: RequestWithSession, @Res() response: Response) {
    try {
      const user = await this.authService.verifyPasswordResetToken(token);

      response.send(new ResponseSuccess('Verification Successful', {
        username: user.username
      }));
    } catch (error) {
      response.send(new ResponseError('Verification Failed', error));
    }
  }

  @Get('cancel-password-reset/:token')
  @Bind(Param('token'))
  async cancelPasswordResetToken(token) {
    try {
      await this.usersService.cancelPasswordReset(token);

      return new ResponseSuccess('Cancel Password Reset Successful');
    } catch (error) {
      console.error(error);
      return new ResponseError('Cancel Password Reset Failed', error)
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

  @Post('send-reset-password-mail')
  async sendResetPasswordMail(@Body('username') username: string) {
    try {
      await this.usersService.sendResetPasswordMail(username);

      return new ResponseSuccess('Send Reset Password Success');
    } catch (error) {
      return new ResponseError('Send Reset Password Failed', error)
    }
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

  @Post('reset-password-token')
  async resetPasswordToken(@Req() req: RequestWithSession, @User() user: UserEntity, @Body() body: ResetNewPasswordDTO) {
    const { username, password, token } = body;

    try {
      const user = this.usersService.findByPasswordResetToken(token);

      if (!user) {
        return new ResponseError('Password Reset Token Invalid');
      }

      await this.authService.resetPassword(username, password);


      return new ResponseSuccess('Reset Password Success');
    } catch (error) {
      return new ResponseError('Reset Password Failed', error)
    }
  }

  //TODO: add forgot password
}
