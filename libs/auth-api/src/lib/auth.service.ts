import { HttpException, Injectable, UnauthorizedException, HttpStatus} from '@nestjs/common';
import {UsersService} from '@valor-launchpad/users-api';
import {JwtService} from '@nestjs/jwt';
import {CryptService} from '@valor-launchpad/common-api';
import {IncorrectPasswordException} from "./exceptions/incorrect-password";
import {RegisterDTO} from './auth.dto';
import * as bcrypt from 'bcrypt';
import { RefreshTokenStoreService } from './refresh-token-store.service';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    public readonly jwtService: JwtService,
    private crypt: CryptService,
    private refreshTokenStoreService: RefreshTokenStoreService,
    private prisma: PrismaService,
  ) {}

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
    if (cleanUser.deletedDate) {
      throw new HttpException('User has been deleted', HttpStatus.BAD_REQUEST)
    }
    const loginServiceResult = await this.usersService.logIn(cleanUser.username);
    const accessToken = this.jwtService.sign(cleanUser);
    // store refresh toke to redis
    const salt = await bcrypt.genSalt(10)
    const refreshToken = await bcrypt.hash(accessToken.split('.')[2] + salt, salt);
    await this.refreshTokenStoreService.saveRefreshToken(cleanUser.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: cleanUser
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const refreshTokenInRedis = await this.refreshTokenStoreService.getRefreshToken(userId);
    const user = await this.prisma.userEntity.findFirst({
      where: { id: userId },
      select: { username: true },
    });
    if (refreshTokenInRedis === refreshToken) {
      // re-login automatically
      return await this.login(user);
    } else {
      throw new UnauthorizedException('refreshToken not correct');
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

  async verifyPasswordResetToken(token: string) {
    const cleanUser = await this.usersService.verifyPasswordResetToken(token);

    return cleanUser
  }
}
