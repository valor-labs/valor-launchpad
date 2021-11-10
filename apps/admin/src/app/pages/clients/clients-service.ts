import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getClients(username?: string) {
    const params: { username?: string } = {};
    if (username) {
      params.username = username;
    }
    return this.httpClient.get<any>(
      this.config.environment.apiBase + `api/clients/v1`,
      { params }
    );
  }
}
