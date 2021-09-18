import { Module } from '@nestjs/common';
import { DashboardSocialController } from './dashboard-social.controller';
import { DashboardSocialService } from './dashboard-social.service';
import { PrismaService } from '@valor-launchpad/prisma';
import { SocialActivityService } from './social-activity.service';

@Module({
  controllers: [DashboardSocialController],
  providers: [PrismaService, DashboardSocialService, SocialActivityService],
})
export class DashboardSocialModule {}
