import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { SocketService } from '../socket/socket.service';
import { TermsOfUseService } from '../../pages/terms-of-use';
import { switchMap, filter } from 'rxjs/operators';
import { RequestingUser } from '@valor-launchpad/api-interfaces';

export interface IAuthService {
  access_token: string;
  user: BehaviorSubject<RequestingUser>;

  checkIfUsernameExists(
    username: string
  ): Observable<{ existedUsername: boolean }>;

  signUp(user);

  signOut(): Observable<void>;

  getCurrentUser(refresh): Observable<RequestingUser>;

  getToken(): string;

  isLoggedIn(): Observable<boolean>;

  generateNewAccessToken(): Observable<{
    access_token: string;
    refresh_token: string;
    user: RequestingUser;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  access_token;
  user = new BehaviorSubject<RequestingUser>(null);

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
    return this.httpClient.post<{
      success: boolean
      message: string
    }>(
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
          this.user.next(null);
          this.termsOfUseService.resetAcceptTermsOfUse();
          localStorage.removeItem('refresh_token');
          this.socketService.disconnect();
          this.router.navigate(['/sign-in']);
        })
      );
  }

  getCurrentUser(refresh = false): Observable<RequestingUser> {
    if (!refresh && this.user.value) {
      return this.user;
    } else {
      return this.httpClient
        .get(this.config.environment.apiBase + 'api/auth/v1/current-user')
        .pipe(
          map((data: { user: RequestingUser }) => {
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
      .get<RequestingUser>(
        this.config.environment.apiBase + 'api/auth/v1/current-user'
      )
      .pipe(
        tap((data) => {
          if (data) {
            this.socketService.connect();
          }
        }),
        tap((data) => {
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
      .post<{
        access_token: string;
        refresh_token: string;
        user: RequestingUser;
      }>(this.config.environment.apiBase + 'api/auth/v1/refresh', {
        access_token,
        refresh_token,
      })
      .pipe(
        tap((data) => {
          this.user.next(data.user);
          this.access_token = data.access_token;
          localStorage.setItem('refresh_token', data.refresh_token);
        })
      );
  }
}
