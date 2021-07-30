import { Module } from '@nestjs/common';
import { DashboardAnalyticsController } from './dashboard-analytics.controller';
import { DashboardAnalyticsService } from './dashboard-analytics.service';
import {PrismaModule} from '@valor-launchpad/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [DashboardAnalyticsController],
  providers: [DashboardAnalyticsService]
})
export class DashboardAnalyticsModule {

}
