import { Module } from '@nestjs/common';
import {EmailService} from './email.service';
import {SendgridService} from './sendgrid/sendgrid.service';

@Module({
  controllers: [],
  providers: [EmailService, SendgridService],
  exports: [EmailService],
})
export class EmailModule {}
