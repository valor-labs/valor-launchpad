import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  DashboardDefaultOverviewVo,
  DashboardDefaultRevenueMonthlyVo,
  formatStartEnd,
  DashboardDefaultRevenueVo,
  UserEntity,
  DashboardDefaultAppointmentVo,
  DashboardDefaultProjectVo,
} from '@valor-launchpad/common-api';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@valor-launchpad/users-api';

@Controller('v1')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(public dashboardService: DashboardService) {}

  @Get('overview')
  async getOverview(
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ): Promise<DashboardDefaultOverviewVo> {
    const { start, end } = formatStartEnd(startAt, endAt);
    return this.dashboardService.getOverview(start, end);
  }

  @Get('revenue-monthly')
  async getRevenueMonthly(): Promise<DashboardDefaultRevenueMonthlyVo[]> {
    return this.dashboardService.getRevenueMonthly();
  }

  @Get('revenue')
  async getRevenue(
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ): Promise<DashboardDefaultRevenueVo[]> {
    const { start, end } = formatStartEnd(startAt, endAt);
    return this.dashboardService.getRevenue(start, end);
  }

  @Get('appointment')
  async getAppointment(
    @User() user: UserEntity
  ): Promise<DashboardDefaultAppointmentVo[]> {
    return this.dashboardService.getAppointments(user.id);
  }

  @Get('latest-projects')
  async getProjects(): Promise<DashboardDefaultProjectVo[]> {
    return this.dashboardService.getLatestProjects();
  }
}
