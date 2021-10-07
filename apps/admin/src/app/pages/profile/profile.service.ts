import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ENV_CONFIG, EnvironmentConfig} from '../../core/http/environment-config.interface';
import { Profile } from '@api/projects';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private httpClient: HttpClient) {
  }

  getProfile() {
    return this.httpClient.get<Profile>(this.config.environment.apiBase + `api/profile/v1`);
  }

  updateProfilePublicInfo(file: File, profileId: string, username: string, alt: string) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("profileId", profileId);
    formData.append("username", username);
    formData.append("alt", alt);
    return this.httpClient.post(this.config.environment.apiBase + 'api/profile/v1/updateProfile', formData);
  }
}
