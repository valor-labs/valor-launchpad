import { Module } from '@nestjs/common';
import { DashboardAnalyticsController } from './dashboard-analytics.controller';
import { DashboardAnalyticsService } from './dashboard-analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardAnalyticsEntity } from './dashboard-analytics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DashboardAnalyticsEntity])],
  controllers: [DashboardAnalyticsController],
  providers: [DashboardAnalyticsService]
})
export class DashboardAnalyticsModule {

}
