import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RESET_PASSWORD, ResetPasswordPayload } from './users-events.constant';
import { EmailService } from '@valor-launchpad/email';

@Injectable()
export class UsersEventsService {
  private readonly logger = new Logger(UsersEventsService.name);

  constructor(private emailService: EmailService) {}

  @OnEvent(RESET_PASSWORD, { async: true })
  async resetPassword({ email, password }: ResetPasswordPayload) {
    try {
      await this.sendResetPasswordEmail(email, password);
      this.logger.log('Password reset email sent succeeded');
    } catch (e) {
      this.logger.error('Password reset email sent failed:\n', e);
    }
  }

  async sendResetPasswordEmail(email: string, password: string) {
    // todo: put template in database
    await this.emailService.sendEmail({
      to: email,
      from: 'zack.chapple@valor-software.com',
      subject: 'Your Initial Password',
      text: 'Reset your password here',
      html:
        '<strong>Your Initial Password</strong><br><br>' +
        `${password}
          <br>
          <br>
          Or, copy and paste the following URL into your browser:
          <span>${process.env.HOST}/login}</span>`,
    });
  }
}
