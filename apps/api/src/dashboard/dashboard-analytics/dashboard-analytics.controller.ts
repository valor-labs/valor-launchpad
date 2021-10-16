import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardAnalyticsService } from './dashboard-analytics.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import {
  DashboardAnalyticByCityVo,
  DashboardAnalyticByInterestVo,
  DashboardAnalyticByLanguageVo,
  DashboardAnalyticByPlatformVo,
  DashboardAnalyticBySourceVo,
  DashboardAnalyticOverviewVo,
  DashboardAnalyticTrafficVo,
  formatStartEnd
} from '@valor-launchpad/common-api';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class DashboardAnalyticsController {
  constructor(public dashboardAnalyticsService: DashboardAnalyticsService) {}

  @Get('overview')
  getOverview(
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ): Promise<DashboardAnalyticOverviewVo> {
    const { start, end } = formatStartEnd(startAt, endAt);
    return this.dashboardAnalyticsService.getOverview(start, end);
  }

  @Get('by-city')
  getByCity(
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ): Promise<DashboardAnalyticByCityVo> {
    const { start, end } = formatStartEnd(startAt, endAt);
    return this.dashboardAnalyticsService.getAnalyticByCity(start, end);
  }

  @Get('by-language')
  getByLanguage(
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ): Promise<DashboardAnalyticByLanguageVo> {
    const { start, end } = formatStartEnd(startAt, endAt);
    return this.dashboardAnalyticsService.getAnalyticByLanguage(start, end);
  }

  @Get('by-platform')
  getByPlatform(): Promise<DashboardAnalyticByPlatformVo> {
    return this.dashboardAnalyticsService.getAnalyticByPlatform();
  }

  @Get('by-interest')
  getByInterest(
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ): Promise<DashboardAnalyticByInterestVo> {
    const { start, end } = formatStartEnd(startAt, endAt);
    return this.dashboardAnalyticsService.getAnalyticByInterest(start, end);
  }

  @Get('by-source')
  getBySource(
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ): Promise<DashboardAnalyticBySourceVo> {
    const { start, end } = formatStartEnd(startAt, endAt);
    return this.dashboardAnalyticsService.getAnalyticRevenueBySource(
      start,
      end
    );
  }

  @Get('by-traffic')
  getByTraffic(
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ): Promise<DashboardAnalyticTrafficVo> {
    const { start, end } = formatStartEnd(startAt, endAt);
    return this.dashboardAnalyticsService.getAnalyticByTraffic(start, end);
  }
}
