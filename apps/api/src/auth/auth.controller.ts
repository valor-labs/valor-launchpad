import {Bind, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth-guard";
import {RequestWithSession} from "../common/RequestWithSession";
import {AuthService} from "./auth.service";
import {Response} from 'express';
import {IResponse} from '../common/interfaces/response.interface';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {UserEntity} from '../users/user.entity';
import {ResponseError, ResponseSuccess} from '../common/dto/response.dto';
import {UsersService} from '../users/users.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {EmailService} from '../../../../libs/email/src/lib/email.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {SmsService} from '../../../../libs/sms/src/lib/sms.service'; //TODO: fix this import


@Controller('v1')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService,
              private smsService:SmsService,
              private emailService: EmailService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body, @Req() req: RequestWithSession, @Res() response: Response) {
    const loginResponse = await this.authService.login(body);
    req.session.token = loginResponse.access_token;
    req.session.user = loginResponse.user;
    response.cookie('access_token', loginResponse.access_token)
    response.send(await this.authService.login(body));
  }

  @Get('sign-out')
  async signOut(@Req() req: RequestWithSession, @Res() response: Response) {
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
  async register(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      const createdUser = await this.usersService.createUser(new UserEntity(createUserDto));
      await this.smsService.sendMessage(
        {
          body: `${createdUser.phoneVerifyToken} is your phone verification ID`,
          from: '+18593491320',
          to: createUserDto.phone
        }
      )
      await this.emailService.sendEmail({
        to: createUserDto.email,
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
