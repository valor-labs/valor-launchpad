import { Injectable } from '@nestjs/common';
import {PrismaService} from '@valor-launchpad/prisma';

@Injectable()
export class DashboardService {


  constructor(private prisma: PrismaService) {
  }

  async getData() {
    return await this.prisma.dashboardEntity.findFirst();
  }
}
