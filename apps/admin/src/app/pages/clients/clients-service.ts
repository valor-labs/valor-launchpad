import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { HttpClient } from '@angular/common/http';
import { ClientVo } from '@valor-launchpad/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getClients() {
    return this.httpClient.get<ClientVo[]>(
      this.config.environment.apiBase + `api/clients/v1/getClients`
    );
  }
}
