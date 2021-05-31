import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DashboardEntity } from './dashboard.entity';

@Injectable()
export class DashboardService {


  constructor(@InjectRepository(DashboardEntity)
              private dashboardRepository: Repository<DashboardEntity>) {
  }

  async getData(): Promise<DashboardEntity> {
     return await this.dashboardRepository.findOne();
  }
}
