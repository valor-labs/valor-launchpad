import {Controller, Get} from '@nestjs/common';
import { FAQ, Message } from '@valor-launchpad/api-interfaces';
import {AppService} from "./app.service";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('faq')
  getFAQ():FAQ[]{
    return this.appService.getFAQ();
  }
}
