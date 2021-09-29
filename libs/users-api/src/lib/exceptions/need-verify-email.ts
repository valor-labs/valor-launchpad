import { HttpException, HttpStatus } from '@nestjs/common';

export class NeedVerifyEmailException extends HttpException {
  constructor() {
    super(
      'Please check your email to verify your email address',
      HttpStatus.FORBIDDEN
    );
  }
}
