import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {CryptService} from "../crypt/crypt.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private crypt: CryptService
  ) {
  }

  async validateUser(payload): Promise<any> {
    const user = await this.usersService.findOneUnsafe(payload.username);
    if (typeof user === 'undefined') {
      return false;
    } else {
      return await this.crypt.validateHash(payload.password, user.password);
    }
  }

  async login(user: any) {
    const payload = {username: user.username};
    const cleanUser = await this.usersService.findOne(payload.username);
    this.usersService.logIn(cleanUser.username);
    return {
      access_token: this.jwtService.sign(cleanUser),
      user: cleanUser
    };
  }
}
