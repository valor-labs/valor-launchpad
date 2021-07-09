import {Injectable} from '@nestjs/common';
import * as sgMail from '@sendgrid/mail'

@Injectable()
export class SendgridService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendEmail(email) {
    try {
      await sgMail.send(email);
    } catch (error) {
      console.error(error)
    }
  }
}
