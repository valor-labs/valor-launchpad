import { Module } from '@nestjs/common';
import { PasswordValidatorController } from './passwordValidator.controller';
import { PasswordValidatorService } from './passwordValidator.service';
import { UsersApiModule } from '@valor-launchpad/users-api';
import { PrismaModule } from '@valor-launchpad/prisma';

@Module({
  imports: [UsersApiModule, PrismaModule],
  controllers: [PasswordValidatorController],
  providers: [PasswordValidatorService],
})
export class PasswordValidatorModule {}
