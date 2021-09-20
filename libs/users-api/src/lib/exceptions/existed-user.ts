import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistedUserException extends HttpException {
  constructor() {
    super('Username already exists', HttpStatus.FORBIDDEN);
  }
}
