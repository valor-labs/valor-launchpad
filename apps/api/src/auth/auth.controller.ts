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
import {EmailService} from '../../../../libs/email/src/lib/email.service'; //TODO: fix this import


@Controller('v1')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService, private emailService: EmailService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body, @Req() req: RequestWithSession, @Res() response: Response) {
    const loginResponse = await this.authService.login(body);
    req.session.token = loginResponse.access_token;
    req.session.user = loginResponse.user;
    response.cookie('access_token', loginResponse.access_token)
    response.send(await this.authService.login(body));
  }

  @Get('sign-out')
  @HttpCode(HttpStatus.OK)
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
      await this.emailService.sendEmail({
        to: 'zack.chapple@valor-software.com',
        from: 'zack.chapple@valor-software.com',
        subject: 'Verify your email with valor-launchpad',
        text: 'Super Easy',
        html: '<strong>Please verify your email</strong></br></br>' +
          `<a target="_blank" href="http://localhost:4200/verify-user/${createdUser.emailVerifyToken}">Verify Now</a>`,
      })
      //TODO: Send email for email verification
      //TODO: Save user email consent
      return new ResponseSuccess('Registration Successful')
    } catch (error) {
      return new ResponseError('Registration Failed', error)
    }
  }

  // @Post('check-username')
  // async checkUsername(@Body() username): Promise<IResponse> {
  //
  // }
}
