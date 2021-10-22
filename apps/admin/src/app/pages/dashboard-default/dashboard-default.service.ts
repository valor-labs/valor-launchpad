import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import type {
  DashboardDefaultOverviewVo,
  DashboardDefaultRevenueMonthlyVo,
  DashboardDefaultRevenueVo,
  DashboardDefaultProjectVo,
  DashboardDefaultAppointmentVo,
} from '@valor-launchpad/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardDefaultService {
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getOverview(startAt: Date, endAt: Date) {
    return this.httpClient.get<DashboardDefaultOverviewVo>(
      this.config.environment.apiBase + 'api/dashboard/v1/overview',
      { params: { startAt: startAt.toISOString(), endAt: endAt.toISOString() } }
    );
  }

  getMonthlyRevenue() {
    return this.httpClient.get<DashboardDefaultRevenueMonthlyVo[]>(
      this.config.environment.apiBase + 'api/dashboard/v1/revenue-monthly'
    );
  }

  getSalesRevenue(startAt: Date, endAt: Date) {
    return this.httpClient.get<DashboardDefaultRevenueVo[]>(
      this.config.environment.apiBase + 'api/dashboard/v1/revenue',
      { params: { startAt: startAt.toISOString(), endAt: endAt.toISOString() } }
    );
  }

  getAppointments() {
    return this.httpClient.get<DashboardDefaultAppointmentVo[]>(
      this.config.environment.apiBase + 'api/dashboard/v1/appointment'
    );
  }

  getLatestProjects() {
    return this.httpClient.get<DashboardDefaultProjectVo[]>(
      this.config.environment.apiBase + 'api/dashboard/v1/latest-projects'
    );
  }
}
