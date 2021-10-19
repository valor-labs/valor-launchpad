import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import * as dayjs from 'dayjs';
import {
  DashboardDefaultAppointmentVo,
  DashboardDefaultOverviewVo,
  DashboardDefaultProjectVo,
  DashboardDefaultRevenueMonthlyVo,
  DashboardDefaultRevenueVo,
} from '@valor-launchpad/api-interfaces';
import { getPrevPeriod } from '@valor-launchpad/common-api';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getOverview(
    start: Date,
    end: Date
  ): Promise<DashboardDefaultOverviewVo> {
    const query = await this.prisma.dashboardDefaultOverview.aggregate({
      where: {
        date: {
          gte: dayjs(start).startOf('d').toDate(),
          lte: dayjs(end).endOf('d').toDate(),
        },
      },
      _sum: { totalEarnings: true, totalRevenue: true, pendingOrders: true },
    });
    const { prevStart, prevEnd } = getPrevPeriod(start, end);
    const prevQuery = await this.prisma.dashboardDefaultOverview.aggregate({
      where: {
        date: {
          gte: dayjs(prevStart).startOf('d').toDate(),
          lte: dayjs(prevEnd).endOf('d').toDate(),
        },
      },
      _sum: { totalEarnings: true, totalRevenue: true, pendingOrders: true },
    });
    return {
      totalEarnings: {
        value: query._sum.totalEarnings.toNumber(),
        percentage: this.percentBy(
          query._sum.totalEarnings.toNumber(),
          prevQuery._sum.totalEarnings.toNumber()
        ),
      },
      pendingOrders: {
        value: query._sum.pendingOrders,
        percentage: this.percentBy(
          query._sum.pendingOrders,
          prevQuery._sum.pendingOrders
        ),
      },
      totalRevenue: {
        value: query._sum.totalRevenue.toNumber(),
        percentage: this.percentBy(
          query._sum.totalRevenue.toNumber(),
          prevQuery._sum.totalRevenue.toNumber()
        ),
      },
    };
  }

  async getRevenueMonthly(): Promise<DashboardDefaultRevenueMonthlyVo[]> {
    const query = await this.prisma.dashboardDefaultMonthlyRevenue.findMany({
      where: {
        month: {
          gte: dayjs().startOf('year').toDate(),
          lte: dayjs().endOf('year').toDate(),
        },
      },
      orderBy: { month: 'asc' },
    });
    const lastYearQuery =
      await this.prisma.dashboardDefaultMonthlyRevenue.findMany({
        where: {
          month: {
            gte: dayjs().subtract(1, 'year').startOf('year').toDate(),
            lte: dayjs().subtract(1, 'year').endOf('year').toDate(),
          },
        },
        orderBy: { month: 'asc' },
      });
    return query.map((item, index) => {
      return {
        month: item.month,
        thisYearRevenue: item.revenue?.toNumber() ?? 0,
        lastYearRevenue: lastYearQuery[index]?.revenue?.toNumber() ?? 0,
      };
    });
  }

  async getRevenue(
    start: Date,
    end: Date
  ): Promise<DashboardDefaultRevenueVo[]> {
    const query = await this.prisma.dashboardDefaultDailyRevenue.groupBy({
      _sum: { revenue: true },
      where: {
        date: {
          gte: dayjs(start).startOf('d').toDate(),
          lte: dayjs(end).endOf('d').toDate(),
        },
      },
      by: ['source'],
    });
    const { prevStart, prevEnd } = getPrevPeriod(start, end);
    const prevQuery = await this.prisma.dashboardDefaultDailyRevenue.groupBy({
      _sum: { revenue: true },
      where: {
        date: {
          gte: dayjs(prevStart).startOf('d').toDate(),
          lte: dayjs(prevEnd).endOf('d').toDate(),
        },
      },
      by: ['source'],
    });
    return query.map((item) => {
      const revenue = item._sum.revenue.toNumber();
      const prevRevenue =
        prevQuery
          ?.find(({ source }) => source === item.source)
          ?._sum?.revenue?.toNumber() ?? 0;
      return {
        name: item.source,
        value: revenue,
        percentage: this.percentBy(revenue, prevRevenue),
      };
    });
  }

  async getAppointments(
    userId: string
  ): Promise<DashboardDefaultAppointmentVo[]> {
    return await this.prisma.appointment.findMany({
      select: { title: true, content: true, createdDate: true },
      where: { userId },
      orderBy: { createdDate: 'desc' },
    });
  }

  async getLatestProjects(): Promise<DashboardDefaultProjectVo[]> {
    const query = await this.prisma.projectsEntity.findMany({
      select: {
        title: true,
        status: true,
        summary: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
        assignee: {
          select: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
      orderBy: { createdDate: 'desc' },
    });
    return query.map((item) => ({
      title: item.title,
      assignee: item.assignee?.map(
        (ae) => `${ae.user.firstName} ${ae.user.lastName}`
      ),
      startDate: item.summary?.startDate,
      endDate: item.summary?.endDate,
      status: item.status,
    }));
  }

  private percentBy(after: number, before: number) {
    if (before === 0) {
      return 1;
    } else {
      return (after - before) / before;
    }
  }
}
