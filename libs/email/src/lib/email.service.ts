import {Injectable} from '@nestjs/common';
import {SendgridService} from './sendgrid/sendgrid.service';

@Injectable()
export class EmailService {
  constructor(private sendgrid: SendgridService) {
  //  TODO: this should take the classes dynamically based on the email provider
  }

  async sendEmail(email){
    await this.sendgrid.sendEmail(email)
  }
}
