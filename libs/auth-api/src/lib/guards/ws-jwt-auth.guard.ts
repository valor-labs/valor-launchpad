import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('wsJwt') {
  handleRequest(err, user, info) {
    if (info instanceof TokenExpiredError) {
      // do stuff when token is expired
      console.log('token expired');
    }
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
