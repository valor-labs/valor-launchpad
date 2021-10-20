import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ENV_CONFIG,
  EnvironmentConfig,
} from '../../core/http/environment-config.interface';
import { Observable } from 'rxjs';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root',
})
export class ResetNewPasswordService {
  baseURL = this.config.environment.apiBase + 'api/auth/v1/';

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}
  resetPassword(username, password, token?) {
    const url = `${this.baseURL}reset-password`;
    const urlByToken = `${this.baseURL}reset-password-token`;

    return this.httpClient.post(token ? urlByToken : url, {
      username,
      password,
      token,
    });
  }

  verifyPasswordResetToken(token): Observable<any> {
    const url = `${this.baseURL}verify-password-reset/${token}`;

    return this.httpClient.get(url);
  }

  cancelPasswordReset(token): Observable<any> {
    const url = `${this.baseURL}cancel-password-reset/${token}`;

    return this.httpClient.get(url);
  }
}
