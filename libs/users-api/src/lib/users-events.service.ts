import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  RESET_PASSWORD,
  ResetPasswordPayload,
  USER_CREATED_FAT,
  UserCreatedFatPayload,
} from './users-events.constant';
import { EmailService } from '@valor-launchpad/email';

@Injectable()
export class UsersEventsService {
  private readonly logger = new Logger(UsersEventsService.name);

  constructor(private emailService: EmailService) {}

  @OnEvent(USER_CREATED_FAT, { async: true })
  async onUserCreated(payload: UserCreatedFatPayload) {
    const { email } = payload.user;
    if (payload.shouldSendPassword) {
      await this.sendResetPasswordEmail(email, payload.rawPassword, 'Welcome to valor-launchpad');
    }
  }

  @OnEvent(RESET_PASSWORD, { async: true })
  async resetPassword({ email, password }: ResetPasswordPayload) {
    try {
      await this.sendResetPasswordEmail(email, password);
      this.logger.log(`Password reset email sent to ${email} succeeded`);
    } catch (e) {
      this.logger.error(`Password reset email sent to ${email} failed:\n`, e);
    }
  }

  async sendResetPasswordEmail(email: string, password: string, subject = 'Your password has been reset') {
    // todo: put template in database
    await this.emailService.sendEmail({
      to: email,
      from: 'zack.chapple@valor-software.com',
      subject,
      text: 'Reset your password here',
      html:
        '<strong>Your Initial Password</strong><br><br>' +
        `<span style="padding: 5px 10px; background-color: #f0f0f0; font-size: 14px; display: inline-block">${password}</span>
          <br>
          <br>
          Or, copy and paste the following URL into your browser:
          <span>${process.env.HOST}/sign-in</span>`,
    });
  }
}
