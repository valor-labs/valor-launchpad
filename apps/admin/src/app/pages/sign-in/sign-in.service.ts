import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  async login(signInForm) {
    await this.httpClient.post('api/auth/v1/login', signInForm).subscribe((data) => {
      // TODO: Catch where user does not authenticated properly
      this.router.navigate(['/dashboard-default']);
    })
  }
}
