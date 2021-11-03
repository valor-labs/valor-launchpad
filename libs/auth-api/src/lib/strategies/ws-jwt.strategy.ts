import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsJwt') {
  constructor() {
    super({
      jwtFromRequest: (socket: Socket) => {
        return socket.handshake.headers.authorization;
      },
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
