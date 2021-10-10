import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '@valor-launchpad/users-api';
import {JwtService} from '@nestjs/jwt';
import {CryptService} from '@valor-launchpad/common-api';
import {IncorrectPasswordException} from "./exceptions/incorrect-password";
import {RegisterDTO} from './auth.dto';
import * as bcrypt from 'bcrypt';
import {RefreshToken} from '../../../common-api/src/lib/entity/refreshToken.entity';
import { RedisSessionStore } from './sessionStore';
import {redisClient} from 'apps/api/src/main';

@Injectable()
export class AuthService {
  private sessionStore;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private crypt: CryptService,
  ) {
    this.sessionStore = RedisSessionStore.getInstance(redisClient);
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
    const accessToken = this.jwtService.sign(cleanUser);

    // store refresh toke to redis
    const salt = await bcrypt.genSalt(10)
    const refreshToken = new RefreshToken();
    refreshToken.hash = await bcrypt.hash(accessToken.split('.')[2] + salt, salt);
    refreshToken.username = user.username;
    refreshToken.createdDate = new Date();
    refreshToken.expire = '24h';
    await this.sessionStore.set('refreshToken', refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken.hash,
      user: cleanUser
    };
  }

  async refreshToken(oldAccessToken: string, oldRefreshToken: RefreshToken) {
    const refreshTokenRedis = await this.sessionStore.get('refreshToken');

    if (!refreshTokenRedis) {
        throw new UnauthorizedException(`Invalid tokens`);
    }

    if ((Date.parse(refreshTokenRedis.createdDate) + (24*60*60*1000)) < new Date().getTime()) {
      throw new UnauthorizedException(`tokens expired`);
    }

    const payload = { username: refreshTokenRedis.username };
    const cleanUser = await this.usersService.findOne(payload.username);
    const newAccesToken = await this.jwtService.sign(cleanUser)
    const salt = await bcrypt.genSalt(10)

    refreshTokenRedis.hash = await bcrypt.hash(newAccesToken.split('.')[2] + salt, salt)

    try {
        await this.sessionStore.set('refreshToken', refreshTokenRedis)
        return { accessToken: newAccesToken, refreshToken: refreshTokenRedis.hash, user: cleanUser};
    } catch (e) {
        throw new InternalServerErrorException();
    }
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

  async resetPassword(username: string, password: string) {
    const newPasswordCrypt = await this.crypt.hashPassword(password);

    return await this.usersService.resetNewPassword(username, newPasswordCrypt);
  }
}
