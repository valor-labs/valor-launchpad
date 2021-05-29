import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardEntity } from './dashboard.entity';

@Controller('v1')
export class DashboardController {

  constructor(public dashboardService: DashboardService) {
  }

  @Get('all')
  async getAllData(): Promise<DashboardEntity> {
    return await this.dashboardService.getData();
  }


}


