import {Bind, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth-guard";
import {CreateUser, RequestWithSession, UserEntity} from "@valor-launchpad/common-api";
import {AuthService} from "./auth.service";
import {Response} from 'express';
import {IResponse} from '@valor-launchpad/common-api';
import {User} from '@valor-launchpad/users-api';
import {ResponseError, ResponseSuccess} from '@valor-launchpad/common-api';
import {UsersService} from '@valor-launchpad/users-api';
import {EmailService} from '@valor-launchpad/email';
import {SmsService} from '@valor-launchpad/sms';

@Controller('v1')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService,
              private smsService: SmsService,
              private emailService: EmailService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body, @Req() req: RequestWithSession, @Res() response: Response) {
    const loginResponse = await this.authService.login(body);
    req.session.token = loginResponse.access_token;
    req.session.user = loginResponse.user;
    response.cookie('access_token', loginResponse.access_token)
    const loginResult = await this.authService.login(body);
    response.send(loginResult);
  }

  @Get('current-user')
  async getCurrentUser(@Req() req: RequestWithSession, @Res() response: Response) {
    if(req.session && req.session.user){
      return req.session.user;
    } else {
      return response.status(HttpStatus.FORBIDDEN).send({status: 'no current session for user or no user'})
    }
  }

  @Get('sign-out')
  async signOut(@Req() req: RequestWithSession, @Res() response: Response) {
    req.session.destroy();
    response.clearCookie('access_token');
    response.status(HttpStatus.OK).send({status: 'logout successful'});
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
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUser: CreateUser, @User() actingUser: UserEntity): Promise<IResponse> {
    try {
      const createdUser = await this.usersService.createUser(new UserEntity(createUser), actingUser);
      if (createUser.phone) {
        await this.smsService.sendMessage(
          {
            body: `${createdUser.phoneVerifyToken} is your phone verification ID`,
            from: '+18593491320',
            to: createUser.phone
          }
        )
      }
      await this.emailService.sendEmail({
        to: createUser.email,
        from: 'zack.chapple@valor-software.com',
        subject: 'Verify your email with valor-launchpad',
        text: 'Super Easy',
        html: '<strong>Please verify your email</strong></br></br>' +
          `<a target="_blank" href="http://localhost:4200/verify-user/${createdUser.emailVerifyToken}">Verify Now</a>
          </br>
          </br>
          Or, copy and paste the following URL into your browser:
          <span>http://localhost:4200/verify-user/${createdUser.emailVerifyToken}</span>`,
      })
      //TODO: Save user email consent
      return new ResponseSuccess('Registration Successful')
    } catch (error) {
      return new ResponseError('Registration Failed', error)
    }
  }

  //TODO: add forgot password
  //TODO: add reset password
  //TODO: add check username
  // @Post('check-username')
  // async checkUsername(@Body() username): Promise<IResponse> {
  //
  // }
}
