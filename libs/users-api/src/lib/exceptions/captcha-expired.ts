import { HttpException, HttpStatus } from '@nestjs/common';

export class CaptchaExpiredException extends HttpException {
  constructor() {
    super('Verification code incorrect or expired, please resend again.', HttpStatus.FORBIDDEN);
  }
}
