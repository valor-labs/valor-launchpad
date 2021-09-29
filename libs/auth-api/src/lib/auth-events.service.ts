import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  SEND_EMAIL,
  SEND_SMS,
  SendEmailPayload,
  SendSMSPayload,
} from './auth-events.constant';
import { SmsService } from '@valor-launchpad/sms';
import { EmailService } from '@valor-launchpad/email';

@Injectable()
export class AuthEventsService {
  private readonly logger = new Logger(AuthEventsService.name);

  constructor(
    private smsService: SmsService,
    private emailService: EmailService
  ) {}

  @OnEvent(SEND_SMS, { async: true })
  async sendVerifySMS(payload: SendSMSPayload) {
    try {
      await this.smsService.sendMessage({
        body: `${payload.phoneVerifyToken} is your phone verification ID`,
        from: '+18593491320',
        to: payload.phone,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  @OnEvent(SEND_EMAIL, { async: true })
  async sendVerifyEmail({ email, emailVerifyToken }: SendEmailPayload) {
    try {
      await this.emailService.sendEmail({
        to: email,
        from: 'zack.chapple@valor-software.com',
        subject: 'Verify your email with valor-launchpad',
        text: 'Super Easy',
        html:
          '<strong>Please verify your email</strong></br></br>' +
          `<a target="_blank" href="${process.env.HOST}/verify-user/${emailVerifyToken}">Verify Now</a>
          </br>
          </br>
          Or, copy and paste the following URL into your browser:
          <span>${process.env.HOST}/verify-user/${emailVerifyToken}</span>`,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
