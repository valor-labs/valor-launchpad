import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Message } from '@valor-launchpad/api-interfaces';
import { Observable } from 'rxjs';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig
  ) {}
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(
      this.config.environment.apiBase + 'api/users/v1/messages'
    );
  }
}
