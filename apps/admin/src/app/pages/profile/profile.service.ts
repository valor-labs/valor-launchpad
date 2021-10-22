import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ENV_CONFIG,
  EnvironmentConfig,
} from '@valor-launchpad/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getProfile(username?: string) {
    const params: { username?: string } = {};
    if (username) {
      params.username = username;
    }
    return this.httpClient.get<any>(
      this.config.environment.apiBase + `api/profile/v1`,
      { params }
    );
  }

  updateProfilePublicInfo(
    file: File,
    profileId: string,
    username: string,
    alt: string
  ) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('profileId', profileId);
    formData.append('username', username);
    formData.append('alt', alt);
    return this.httpClient.post(
      this.config.environment.apiBase + 'api/profile/v1/updateProfile',
      formData
    );
  }
}
