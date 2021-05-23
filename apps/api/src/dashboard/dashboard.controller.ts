import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

  constructor(public dashboardService: DashboardService) {
  }

  @Get('all')
  async getAllData(): Promise<any> {
    return this.dashboardService.getData();
  }


}


