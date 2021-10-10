import { Inject, Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from '@valor-launchpad/common-api';
import { ENV_CONFIG, EnvironmentConfig } from '../http/environment-config.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access_token;
  token$ : BehaviorSubject<string | undefined>;
  user = new BehaviorSubject<UserEntity>(null);

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private cookieService: CookieService, private router: Router, private httpClient: HttpClient) {
    this.token$ = new BehaviorSubject(this.access_token);
  }

  checkIfUsernameExists(username: string) {
    return this.httpClient.get<{ existedUsername: boolean }>(this.config.environment.apiBase + 'api/auth/v1/verify-username', { params: { username } });
  }

  signUp(user) {
    return this.httpClient.post(this.config.environment.apiBase + 'api/auth/v1/register', user);
  }

  signOut() {
    return this.httpClient.get(this.config.environment.apiBase + `api/auth/v1/sign-out`).pipe(
      map(() => {
        this.access_token = undefined;
        this.token$.next(this.access_token);
        this.router.navigate(['/sign-in'])
      })
    )
  }

  getCurrentUser(refresh = false): Observable<UserEntity> {
    if (!refresh && this.user.value) {
      return this.user;
    } else {
      return this.httpClient.get(this.config.environment.apiBase + 'api/auth/v1/current-user').pipe(
        map((data: { user: UserEntity }) => {
          const user = data?.user;

          this.user.next(data?.user);

          return user;
        })
      )
    }
  }

  getToken() {
    return this.access_token;
  }


  isLoggedIn() {
    const allCookies = this.cookieService.getAll();
    this.access_token = allCookies.access_token;
    this.token$.next(this.access_token);
    return this.httpClient.get(this.config.environment.apiBase + 'api/auth/v1/current-user')
      .pipe(
        map((data: any) => {
          if (!data) {
            this.router.navigate(['/sign-in']);
          } else if (data?.passwordResetNeeded) {
            this.user.next(data);
            this.router.navigate(['/reset-new-password']);
          } else {
            this.user.next(data);
            return true;
          }
        })
      )
    // TODO: this needs to be more sophisticated
  }

  generateNewAccessToken() {
    const access_token = this.cookieService.get('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return this.httpClient.post(this.config.environment.apiBase + 'api/auth/v1/refresh', {access_token, refresh_token})
      .pipe(
        map((data: any) => {
          this.user.next(data.user);
          this.cookieService.set('access_token', data.accessToken);
          this.access_token = data.accessToken;
          this.token$.next(this.access_token);
          localStorage.setItem('refresh_token', data.refreshToken);
        })
      );
  }
}
