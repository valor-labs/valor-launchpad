import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserEntity } from '@valor-launchpad/common-api';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { SocketService } from '../socket/socket.service';
import { TermsOfUseService } from '../../pages/terms-of-use';
import { switchMap, filter } from 'rxjs/operators';

export interface IAuthService {
  access_token: any;
  user: BehaviorSubject<UserEntity>;

  checkIfUsernameExists(username: string): any;

  signUp(user): any;

  signOut(): any;

  getCurrentUser(refresh): Observable<UserEntity>;

  getToken(): any;

  isLoggedIn(): any;

  generateNewAccessToken(): any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  access_token;
  user = new BehaviorSubject<UserEntity>(null);

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private cookieService: CookieService,
    private router: Router,
    private httpClient: HttpClient,
    private socketService: SocketService,
    private termsOfUseService: TermsOfUseService
  ) {}

  checkIfUsernameExists(username: string) {
    return this.httpClient.get<{ existedUsername: boolean }>(
      this.config.environment.apiBase + 'api/auth/v1/verify-username',
      { params: { username } }
    );
  }

  signUp(user) {
    return this.httpClient.post(
      this.config.environment.apiBase + 'api/auth/v1/register',
      user
    );
  }

  signOut() {
    return this.httpClient
      .get(this.config.environment.apiBase + `api/auth/v1/sign-out`)
      .pipe(
        map(() => {
          this.access_token = undefined;
          this.termsOfUseService.resetAcceptTermsOfUse();
          localStorage.removeItem('refresh_token');
          this.socketService.disconnect();
          this.router.navigate(['/sign-in']);
        })
      );
  }

  getCurrentUser(refresh = false): Observable<UserEntity> {
    if (!refresh && this.user.value) {
      return this.user;
    } else {
      return this.httpClient
        .get(this.config.environment.apiBase + 'api/auth/v1/current-user')
        .pipe(
          map((data: { user: UserEntity }) => {
            const user = data?.user;

            this.user.next(data?.user);

            return user;
          })
        );
    }
  }

  getToken() {
    return this.access_token;
  }

  isLoggedIn() {
    const allCookies = this.cookieService.getAll();
    this.access_token = allCookies.access_token;
    return this.httpClient
      .get(this.config.environment.apiBase + 'api/auth/v1/current-user')
      .pipe(
        tap((data) => {
          if (data) {
            this.socketService.connect();
          }
        }),
        tap((data: any) => {
          if (!data) {
            this.router.navigate(['/sign-in']);
          } else {
            this.user.next(data);
          }
        }),
        filter((data) => !!data),
        switchMap(() => {
          return this.termsOfUseService.getUserTermsOfUse();
        }),
        tap((isAcceptTermsOfUse) => {
          if (!isAcceptTermsOfUse) {
            this.router.navigate(['/terms-of-use']);
          }
        }),
        filter((isAcceptTermsOfUse) => isAcceptTermsOfUse),
        map(() => {
          const user = this.user.value;

          if (user?.passwordResetNeeded) {
            this.router.navigate(['/reset-new-password']);
          } else {
            return true;
          }
        })
      );
    // TODO: this needs to be more sophisticated
  }

  generateNewAccessToken() {
    const access_token = this.cookieService.get('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return this.httpClient
      .post<{ access_token: string; refresh_token: string; user }>(
        this.config.environment.apiBase + 'api/auth/v1/refresh',
        { access_token, refresh_token }
      )
      .pipe(
        tap((data) => {
          this.user.next(data.user);
          this.access_token = data.access_token;
          localStorage.setItem('refresh_token', data.refresh_token);
        })
      );
  }
}
