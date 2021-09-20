import { ExtractJwt, Strategy } from 'passport-jwt';
import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {jwtConstants} from "../constants";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
