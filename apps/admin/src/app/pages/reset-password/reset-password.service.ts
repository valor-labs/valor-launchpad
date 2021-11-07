import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  baseURL = this.config.environment.apiBase + 'api/auth/v1/';

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  resetPassword(username): Observable<any> {
    const url = `${this.baseURL}send-reset-password-mail`;
    return this.httpClient.post(url, { username });
  }
}
