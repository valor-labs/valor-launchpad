import { Controller, Get } from '@nestjs/common';
import { DashboardAnalyticsService } from './dashboard-analytics.service';

@Controller('v1')
export class DashboardAnalyticsController {

  constructor(public dashboardAnalyticsService: DashboardAnalyticsService) {
  }

  @Get('all')
  async getAllData() {
    return await this.dashboardAnalyticsService.getData();
  }

}


