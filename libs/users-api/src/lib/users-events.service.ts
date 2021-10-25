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

  constructor(private emailService: EmailService) { }

  @OnEvent(USER_CREATED_FAT, { async: true })
  async onUserCreated(payload: UserCreatedFatPayload) {
    const { email } = payload.user;
    if (payload.shouldSendPassword) {
      await this.sendResetPasswordEmail(email, payload.rawPassword, 'Welcome to valor-launchpad');
    }
  }

  @OnEvent(RESET_PASSWORD, { async: true })
  async resetPassword({ email, username, passwordResetToken }: ResetPasswordPayload) {
    try {
      await this.sendResetPasswordEmail(email, username, passwordResetToken);
      this.logger.log(`Password reset email sent to ${email} succeeded`);
    } catch (e) {
      this.logger.error(`Password reset email sent to ${email} failed:\n`, e);
    }
  }

  async sendResetPasswordEmail(email: string, username, passwordResetToken, subject = 'Your password has been reset') {
    // todo: put template in database
    await this.emailService.sendEmail({
      to: email,
      from: 'zack.chapple@valor-software.com',
      subject,
      text: 'We received a request to update your password',
      html:
        ` <p>Hi ${username},</p>
          <br>
          <p>Please click below button to reset your password.</p>
          <br>
          <a target="_blank" href="${process.env.HOST}/reset-new-password?token=${passwordResetToken}">Reset my password</a>
          <br>
          <a target="_blank" href="${process.env.HOST}/reset-new-password?token=${passwordResetToken}&cancel=true">I did not request a password reset</a>
          <br>
          <p>If you didn't make this request, you don't need to do anything.</p>
          <br>
          <br>
          <p>Thanks</p>
          `,
    });
  }
}
