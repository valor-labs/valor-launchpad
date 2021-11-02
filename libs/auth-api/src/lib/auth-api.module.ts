import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersApiModule } from '@valor-launchpad/users-api';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CryptModule } from '@valor-launchpad/common-api';
import { AuthController } from './auth.controller';
import { EmailModule } from '@valor-launchpad/email';
import { SmsModule } from '@valor-launchpad/sms';
import { AuthEventsService } from './auth-events.service';
import { RefreshTokenStoreService } from './refresh-token-store.service';
import { PrismaModule } from '@valor-launchpad/prisma';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { WsJwtStrategy } from './strategies/ws-jwt.strategy';

@Module({
  imports: [
    UsersApiModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    PrismaModule,
    CryptModule,
    EmailModule,
    SmsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    AuthEventsService,
    RefreshTokenStoreService,
    WsJwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthApiModule {}
