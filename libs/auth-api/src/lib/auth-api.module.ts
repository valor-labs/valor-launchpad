import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {UsersApiModule} from '@valor-launchpad/users-api';
import {AuthService} from './auth.service';
import {jwtConstants} from './constants';
import {JwtStrategy} from './strategies/jwt.strategy';
import {LocalStrategy} from './strategies/local.strategy';
import {CryptModule} from '@valor-launchpad/common-api';
import {AuthController} from './auth.controller';
import {EmailModule} from '@valor-launchpad/email';
import {SmsModule} from '@valor-launchpad/sms';
import {AuthEventsService} from './auth-events.service';
import {RefreshTokenRedisService} from "./refresh-token-redis.service";
import {PrismaService} from "@valor-launchpad/prisma";
import {RefreshStrategy} from "./strategies/refresh.strategy";

@Module({
  imports: [
    UsersApiModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '10s'},
    }),
    CryptModule,
    EmailModule,
    SmsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthEventsService, RefreshStrategy, RefreshTokenRedisService, PrismaService],
  exports: [AuthService],
})
export class AuthApiModule {
}
