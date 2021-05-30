import { Module } from '@nestjs/common';
import { DashboardAnalyticsController } from './dashboard-analytics.controller';
import { DashboardAnalyticsService } from './dashboard-analytics.service';

@Module({
  controllers: [DashboardAnalyticsController],
  providers: [DashboardAnalyticsService]
})
export class DashboardAnalyticsModule {

}
