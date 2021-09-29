import {Injectable} from '@nestjs/common';
import {UsersService} from '@valor-launchpad/users-api';
import {JwtService} from '@nestjs/jwt';
import {CryptService} from '@valor-launchpad/common-api';
import {IncorrectPasswordException} from "./exceptions/incorrect-password";
import {RegisterDTO} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private crypt: CryptService
  ) {
  }

  async validateUser(payload): Promise<boolean> {
    const user = await this.usersService.findOneUnsafe(payload.username);
    if (typeof user === 'undefined' || user == null) {
      return false;
    } else {
      return await this.crypt.validateHash(payload.password, user.password)
    }
  }

  async login(user: any) {
    const payload = {username: user.username};
    const cleanUser = await this.usersService.findOne(payload.username);
    const loginServiceResult = await this.usersService.logIn(cleanUser.username);
    return {
      access_token: this.jwtService.sign(cleanUser),
      user: cleanUser
    };
  }

  async updatePassword(username: string, oldPassword: string, newPassword: string): Promise<void> {
    const userValid = await this.validateUser({username, password: oldPassword});
    if (!userValid) {
      throw new IncorrectPasswordException();
    }
    const newPasswordCrypt = await this.crypt.hashPassword(newPassword);
    return await this.usersService.updatePassword(username, newPasswordCrypt);
  }

  async register(payload: RegisterDTO) {
    return this.usersService.createUser(payload);
  }
}
