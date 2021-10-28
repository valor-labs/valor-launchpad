import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDeleteException extends HttpException {
  constructor() {
    super('The comment does not belong to you', HttpStatus.BAD_REQUEST);
  }
}
