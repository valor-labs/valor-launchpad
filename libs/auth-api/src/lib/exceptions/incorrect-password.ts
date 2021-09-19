import {HttpException, HttpStatus} from "@nestjs/common";

export class IncorrectPasswordException extends HttpException {
  constructor() {
    super('Password is incorrect', HttpStatus.BAD_REQUEST);
  }
}
