import { Injectable } from '@nestjs/common';
import {PrismaService} from '@valor-launchpad/prisma';

@Injectable()
export class DashboardAnalyticsService {

  constructor(private prisma: PrismaService) {
  }

  async getData() {
    return await this.prisma.dashboardAnalyticsEntity.findFirst();
  }

}
