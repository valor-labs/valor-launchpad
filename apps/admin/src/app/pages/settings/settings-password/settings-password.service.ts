import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';

@Injectable({ providedIn: 'root' })
export class SettingsPasswordService {
  private apiBase = this.config.environment.apiBase;

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient
  ) {}

  updatePassword(oldPassword: string, newPassword: string) {
    return this.http.post(`${this.apiBase}api/auth/v1/update-password`, {
      oldPassword,
      newPassword,
    });
  }
}
