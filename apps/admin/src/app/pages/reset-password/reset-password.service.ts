import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  baseURL = this.config.environment.apiBase + 'api/users/v1/';

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  resetPassword(username) {
    const url = `${this.baseURL}resetPassword`;
    return this.httpClient.post(url, { username });
  }
}
