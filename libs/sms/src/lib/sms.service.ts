import {Injectable} from '@nestjs/common';
import {Twilio} from 'twilio';

@Injectable()
export class SmsService {
  twilioClient
  constructor() {
    this.twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_API_KEY)
  }
  async sendMessage(body) {
    const response = await this.twilioClient.messages.create(body)
    console.log(response)
  }
}
