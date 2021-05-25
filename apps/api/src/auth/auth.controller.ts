import {Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth-guard";
import {RequestWithSession} from "../common/RequestWithSession";
import {AuthService} from "./auth.service";
import {Response} from 'express';

@Controller('v1')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body, @Req() req: RequestWithSession, @Res() response:Response) {
    const loginResponse = await this.authService.login(body);
    req.session.token = loginResponse.access_token;
    req.session.user = loginResponse.user;
    response.cookie('access_token', loginResponse.access_token)
    response.send(await this.authService.login(body));
  }

  @Get('sign-out')
  async signOut(@Req() req: RequestWithSession, @Res() response:Response) {
    response.clearCookie('access_token');
    response.status(HttpStatus.OK).send({status: 'logout successful'});
  }
}
