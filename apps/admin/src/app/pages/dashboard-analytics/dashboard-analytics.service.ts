import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ENV_CONFIG,
  EnvironmentConfig,
} from '../../core/http/environment-config.interface';
import {
  DashboardAnalyticTrafficVo,
  DashboardAnalyticOverviewVo,
  DashboardAnalyticByLanguageVo,
  DashboardAnalyticByPlatformVo,
  DashboardAnalyticByInterestVo,
  DashboardAnalyticBySourceVo,
  DashboardAnalyticByCityVo,
} from '@valor-launchpad/common-api';

@Injectable({
  providedIn: 'root',
})
export class DashboardAnalyticsService {
  private apiBase = this.config.environment.apiBase;
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getOverview(startAt: Date, endAt: Date) {
    return this.httpClient.get<DashboardAnalyticOverviewVo>(
      this.apiBase + 'api/dashboard-analytics/v1/overview',
      { params: { startAt: startAt.toISOString(), endAt: endAt.toISOString() } }
    );
  }

  getByCity(startAt: Date, endAt: Date) {
    return this.httpClient.get<DashboardAnalyticByCityVo>(
      this.apiBase + 'api/dashboard-analytics/v1/by-city',
      { params: { startAt: startAt.toISOString(), endAt: endAt.toISOString() } }
    );
  }

  getByLanguage(startAt: Date, endAt: Date) {
    return this.httpClient.get<DashboardAnalyticByLanguageVo>(
      this.apiBase + 'api/dashboard-analytics/v1/by-language',
      { params: { startAt: startAt.toISOString(), endAt: endAt.toISOString() } }
    );
  }

  getByPlatform() {
    return this.httpClient.get<DashboardAnalyticByPlatformVo>(
      this.apiBase + 'api/dashboard-analytics/v1/by-platform'
    );
  }

  getByInterest(startAt: Date, endAt: Date) {
    return this.httpClient.get<DashboardAnalyticByInterestVo>(
      this.apiBase + 'api/dashboard-analytics/v1/by-interest',
      { params: { startAt: startAt.toISOString(), endAt: endAt.toISOString() } }
    );
  }

  getBySource(startAt: Date, endAt: Date) {
    return this.httpClient.get<DashboardAnalyticBySourceVo>(
      this.apiBase + 'api/dashboard-analytics/v1/by-source',
      { params: { startAt: startAt.toISOString(), endAt: endAt.toISOString() } }
    );
  }

  getByTraffic(startAt: Date, endAt: Date) {
    return this.httpClient.get<DashboardAnalyticTrafficVo>(
      this.apiBase + 'api/dashboard-analytics/v1/by-traffic',
      { params: { startAt: startAt.toISOString(), endAt: endAt.toISOString() } }
    );
  }
}
