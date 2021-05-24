import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access_token;

  constructor(private cookieService: CookieService) {
  }

  getToken() {
    return this.access_token;
  }

  isLoggedIn() {
    const allCookies = this.cookieService.getAll();
    this.access_token = allCookies.access_token;
    // TODO: this needs to be more sophisticated
    return Object.keys(allCookies).length > 0;
  }
}
