import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access_token;

  constructor(private cookieService: CookieService, private router: Router, private httpClient: HttpClient) {
  }

  signUp(user) {
    this.httpClient.post('/api/auth/v1/register', user).subscribe((data)=>{
      console.log(data)
    })
  }

  signOut() {
    this.httpClient.get(`/api/auth/v1/sign-out`).subscribe((data) => {
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
    // TODO: this needs to be more sophisticated
    return Object.keys(allCookies).length > 0;
  }
}
