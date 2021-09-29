import {Inject, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserEntity} from '@valor-launchpad/common-api';
import {ENV_CONFIG, EnvironmentConfig} from '../http/environment-config.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access_token;
  user = new ReplaySubject<UserEntity>(1);

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private cookieService: CookieService, private router: Router, private httpClient: HttpClient) {
  }

  checkIfUsernameExists(username: string) {
    return this.httpClient.get<{existedUsername: boolean}>(this.config.environment.apiBase + 'api/auth/v1/verify-username', {params: {username}});
  }

  signUp(user) {
    return this.httpClient.post(this.config.environment.apiBase + 'api/auth/v1/register', user);
  }

  signOut() {
    return this.httpClient.get(this.config.environment.apiBase + `api/auth/v1/sign-out`).pipe(
      map(() => {
        this.access_token = undefined;
        this.router.navigate(['/sign-in'])
      })
    )
  }

  getToken() {
    return this.access_token;
  }


  isLoggedIn() {
    const allCookies = this.cookieService.getAll();
    this.access_token = allCookies.access_token;
    return this.httpClient.get(this.config.environment.apiBase + 'api/auth/v1/current-user')
      .pipe(
        map((data: any) => {
          if (typeof data !== 'undefined' && data !== null) {
            this.user.next(data);
            return true;
          } else {
            this.router.navigate(['/sign-in']);
          }
        })
      )
    // TODO: this needs to be more sophisticated
  }
}
