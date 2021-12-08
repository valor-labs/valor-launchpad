import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  baseURL = this.config.environment.apiBase + 'api/users/v1/';
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  deleteUser(username: string): Observable<unknown> {
    return this.httpClient.post(this.baseURL + 'delete', { username });
  }
}
