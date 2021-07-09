import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {UsersModule} from '../users/users.module';
import {AuthService} from './auth.service';
import {jwtConstants} from './constants';
import {JwtStrategy} from './strategies/jwt.strategy';
import {LocalStrategy} from './strategies/local.strategy';
import {CryptModule} from "../crypt/crypt.module";
import {AuthController} from "./auth.controller";
import {EmailModule} from '../../../../libs/email/src/lib/email.module';
import {SmsModule} from '../../../../libs/sms/src/lib/sms.module'; //TODO: fix this import

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60m'},
    }),
    CryptModule,
    EmailModule,
    SmsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
