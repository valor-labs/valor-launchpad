import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  async login(signInForm) {
    return this.httpClient
      .post(this.config.environment.apiBase + 'api/auth/v1/login', signInForm)
      .pipe(
        map((data: any) => {
          if (!data.success) {
            return data.data;
          }

          localStorage.setItem('refresh_token', data.refresh_token);
          this.authService.user.next(data.user);
          this.cookieService.set(
            'userName',
            `${data.user.firstName} ${data.user.lastName}`
          );
          this.cookieService.set('avatar', data.user.avatar?.src);

          this.cookieService.set('firstName', `${data.user.firstName}`);
          this.cookieService.set('lastName', `${data.user.lastName}`);
          this.cookieService.set(
            'avatar',
            JSON.stringify(data.user.profile.avatar)
          );

          return {
            success: true,
          };
        }),
        catchError((err) => of(err.error))
      );
  }
}
