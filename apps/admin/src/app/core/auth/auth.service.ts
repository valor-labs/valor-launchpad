import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserEntity} from '@valor-launchpad/common-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access_token;
  user = new ReplaySubject<UserEntity>(1);

  constructor(private cookieService: CookieService, private router: Router, private httpClient: HttpClient) {
  }

  signUp(user) {
    this.httpClient.post('/api/auth/v1/register', user).subscribe((data) => {
      console.log(data)
    })
  }

  signOut() {
    this.httpClient.get(`/api/auth/v1/sign-out`).subscribe(() => {
      this.access_token = undefined;
      this.router.navigate(['/sign-in'])
    })
  }

  getToken() {
    return this.access_token;
  }

  isLoggedIn() {
    const allCookies = this.cookieService.getAll();
    this.access_token = allCookies.access_token;
    return this.httpClient.get('api/auth/v1/current-user')
      .pipe(
        map((data: any) => {
          if (typeof data !== 'undefined') {
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
