import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '../../core/http/environment-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ResetNewPasswordService {
  baseURL = this.config.environment.apiBase + 'api/auth/v1/'

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private httpClient: HttpClient) {
  }
  resetPassword(username, password) {
    const url = `${this.baseURL}reset-password`;

    return this.httpClient.post(url, {
      username,
      password
    })
  }
}
