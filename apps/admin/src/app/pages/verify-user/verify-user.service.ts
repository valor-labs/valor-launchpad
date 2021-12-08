import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { IResponse } from '@valor-launchpad/common-api';

@Injectable({
  providedIn: 'root',
})
export class VerifyUserService {
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  verify(token: string) {
    return this.httpClient.get<IResponse>(
      this.config.environment.apiBase + `api/auth/v1/verify-user/${token}`
    );
  }
}
