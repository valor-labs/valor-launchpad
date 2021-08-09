import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENV_CONFIG, EnvironmentConfig} from '../../core/http/environment-config.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardAnalyticsService {

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private httpClient: HttpClient) {
  }

  getData() {
    return this.httpClient.get(this.config.environment.apiBase + `api/dashboard-analytics/v1/all`)
  }
}
