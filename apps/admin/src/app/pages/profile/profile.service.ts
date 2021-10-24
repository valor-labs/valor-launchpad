import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { HttpClient } from '@angular/common/http';

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
    bio: string,
    profileId: string,
    username: string,
    alt: string
  ) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('profileId', profileId);
    formData.append('username', username);
    formData.append('alt', alt);
    formData.append('bio', bio);
    return this.httpClient.post(
      this.config.environment.apiBase + 'api/profile/v1/updateProfile',
      formData
    );
  }

  updateProfilePrivateInfo(updatedPrivateProfile) {
    return this.httpClient.post(
      this.config.environment.apiBase + 'api/profile/v1/updatePrivateProfile',
      updatedPrivateProfile
    );
  }
}
