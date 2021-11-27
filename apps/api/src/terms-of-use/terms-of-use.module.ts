import { Module } from '@nestjs/common';
import { TermsOfUseController } from './terms-of-use.controller';
import { PrismaService } from '@valor-launchpad/prisma';
import { TermsOfUseService } from './terms-of-use.service';

@Module({
  controllers: [TermsOfUseController],
  providers: [TermsOfUseService, PrismaService],
})
export class TermsOfUseModule {}
