import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) {
  }

  isLoggedIn() {
    const allCookies = this.cookieService.getAll();
    // TODO: this needs to be more sophisticated
    return Object.keys(allCookies).length > 0;
  }
}
