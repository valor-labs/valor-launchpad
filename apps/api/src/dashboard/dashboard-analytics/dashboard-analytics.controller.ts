import { Controller, Get } from '@nestjs/common';
import { DashboardAnalyticsService } from './dashboard-analytics.service';

@Controller('v1')
export class DashboardAnalyticsController {

  constructor(public dashboardAnalyticsService:DashboardAnalyticsService) {
  }

  @Get('all')
  getAllData() {
    return this.dashboardAnalyticsService.getData();
  }

}


