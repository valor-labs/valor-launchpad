import { Module } from '@nestjs/common';
import { DashboardAnalyticsController } from './dashboard-analytics.controller';

@Module({
  controllers: [DashboardAnalyticsController]
})
export class DashboardAnalyticsModule {

}
