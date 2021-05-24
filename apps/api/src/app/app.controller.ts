import {Controller, Get, Post, Session, UseGuards, Request, Body, Req} from '@nestjs/common';
import {Message} from '@valor-launchpad/api-interfaces';

import {AppService} from './app.service';
import {LocalAuthGuard} from "../auth/guards/local-auth-guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AuthService} from "../auth/auth.service";
import {UsersService} from "../users/users.service";
import {RequestWithSession} from "../common/RequestWithSession";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private userService: UsersService) {
  }

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
}
