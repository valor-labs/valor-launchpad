import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from '../../core/auth/auth.service';
import {CookieService} from "ngx-cookie-service";
import {ENV_CONFIG, EnvironmentConfig} from '../../core/http/environment-config.interface';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig,
              private httpClient: HttpClient, private router: Router, private authService: AuthService, private cookieService: CookieService) {
  }

  async login(signInForm) {
    return this.httpClient.post(this.config.environment.apiBase + 'api/auth/v1/login', signInForm).pipe(
      map((data: any) => {
        localStorage.setItem('refresh_token',data.refresh_token);
        this.authService.user.next(data.user);
        this.cookieService.set('userName',`${data.user.firstName} ${data.user.lastName}`);
        this.cookieService.set('avatar', data.user.avatar?.src);
        this.router.navigate(['/dashboard-default']);
      }),
      catchError(err => of(
        err.error
      ))
    )
  }
}
