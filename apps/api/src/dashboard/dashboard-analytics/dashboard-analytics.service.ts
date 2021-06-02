import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DashboardAnalyticsEntity } from './dashboard-analytics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardAnalyticsService {

  constructor(@InjectRepository(DashboardAnalyticsEntity)
              private dashboardAnalyticsRepository: Repository<DashboardAnalyticsEntity>
  ) {
  }

  async getData() {
    return await this.dashboardAnalyticsRepository.findOne();
  }

}
