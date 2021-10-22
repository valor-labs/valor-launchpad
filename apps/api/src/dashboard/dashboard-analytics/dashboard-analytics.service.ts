import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import dayjs from 'dayjs';
import { getPrevPeriod } from '@valor-launchpad/common-api';

@Injectable()
export class DashboardAnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverview(start: Date, end: Date) {
    const res = await this.prisma.analyticOverview.aggregate({
      _sum: { bounce: true, realTime: true, visitors: true },
      _avg: { bounceRatio: true, realTimeRatio: true, visitorsRatio: true },
      where: {
        AND: {
          date: {
            gte: dayjs(start).startOf('d').toDate(),
            lte: dayjs(end).endOf('d').toDate(),
          },
        },
      },
    });
    return {
      bounce: {
        value: +res._sum.bounce?.toFixed(4),
        ratio: +res._avg.bounceRatio?.toFixed(4),
      },
      realTime: {
        value: +res._sum.realTime?.toFixed(4),
        ratio: +res._avg.realTimeRatio?.toFixed(4),
      },
      visitors: {
        value: +res._sum.visitors?.toFixed(4),
        ratio: +res._avg.visitorsRatio?.toFixed(4),
      },
    };
  }

  async getAnalyticByCity(start: Date, end: Date) {
    const query = await this.prisma.analyticByCity.groupBy({
      _sum: { value: true },
      where: {
        date: {
          gte: dayjs(start).startOf('d').toDate(),
          lte: dayjs(end).endOf('d').toDate(),
        },
      },
      by: ['cityId'],
      orderBy: { cityId: 'asc' },
    });
    const cityIds = query.map((i) => i.cityId);
    const cityQuery = await this.prisma.city.findMany({
      where: { id: { in: cityIds } },
      orderBy: { id: 'asc' },
    });
    return query.map((item, index) => ({
      cityName: cityQuery[index].cityName,
      value: item._sum.value,
      longitude: cityQuery[index].longitude,
      latitude: cityQuery[index].latitude,
    }));
  }

  async getAnalyticByLanguage(start: Date, end: Date) {
    const res = await this.prisma.analyticByLanguage.groupBy({
      _sum: { value: true },
      by: ['languageId'],
      where: {
        AND: {
          date: {
            gte: dayjs(start).startOf('d').toDate(),
            lte: dayjs(end).endOf('d').toDate(),
          },
        },
      },
      orderBy: { languageId: 'asc' },
    });
    const languageIds = [];
    let total = 0;
    for (const item of res) {
      languageIds.push(item.languageId);
      total += item._sum.value;
    }
    const languages = await this.prisma.language.findMany({
      where: { id: { in: languageIds } },
      orderBy: { id: 'asc' },
    });
    return res.map((item, index) => ({
      value: item._sum.value,
      language: languages[index].language,
      percent: item._sum.value / total,
    }));
  }

  async getAnalyticByPlatform() {
    return await this.prisma.analyticByPlatformMonthly.findMany({
      where: {
        month: {
          gte: dayjs().startOf('year').toDate(),
          lte: dayjs().endOf('year').toDate(),
        },
      },
      orderBy: { month: 'asc' },
    });
  }

  async getAnalyticByInterest(start: Date, end: Date) {
    const query = await this.prisma.analyticByInterest.groupBy({
      where: {
        date: {
          gte: dayjs(start).startOf('d').toDate(),
          lte: dayjs(end).endOf('d').toDate(),
        },
      },
      _avg: { percentage: true },
      by: ['interest'],
    });
    return query.map((i) => ({
      interest: i.interest,
      percentage: i._avg.percentage,
    }));
  }

  async getAnalyticRevenueBySource(start: Date, end: Date) {
    const { prevStart, prevEnd } = getPrevPeriod(start, end);
    const query = await this.prisma.analyticRevenueBySource.groupBy({
      where: {
        date: {
          gte: dayjs(start).startOf('d').toDate(),
          lte: dayjs(end).endOf('d').toDate(),
        },
      },
      _sum: { revenue: true },
      by: ['source'],
    });
    const prevPeriodQuery = await this.prisma.analyticRevenueBySource.groupBy({
      where: {
        date: {
          gte: dayjs(prevStart).startOf('d').toDate(),
          lte: dayjs(prevEnd).endOf('d').toDate(),
        },
      },
      _sum: { revenue: true },
      by: ['source'],
    });
    return query.map((i) => {
      const prevRevenue =
        prevPeriodQuery?.find(({ source }) => source === i.source)?._sum
          ?.revenue ?? 0;
      return {
        name: i.source,
        value: i._sum.revenue,
        rate:
          prevRevenue === 0 ? 1 : (i._sum.revenue - prevRevenue) / prevRevenue,
      };
    });
  }

  async getAnalyticByTraffic(start: Date, end: Date) {
    const query = await this.prisma.analyticByTraffic.groupBy({
      _sum: {
        userCount: true,
        sessionCount: true,
      },
      _avg: {
        bounceRate: true,
        sessionDuration: true,
      },
      where: {
        date: {
          gte: dayjs(start).startOf('d').toDate(),
          lte: dayjs(end).endOf('d').toDate(),
        },
      },
      by: ['source'],
    });
    return query.map((i) => ({
      source: i.source,
      userCount: i._sum.userCount,
      sessionCount: i._sum.sessionCount,
      bounceRate: i._avg.bounceRate.toNumber(),
      sessionDuration: i._avg.sessionDuration,
    }));
  }
}
