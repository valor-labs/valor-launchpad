import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from '../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) {

  }

  async login(signInForm) {
    await this.httpClient.post('api/auth/v1/login', signInForm).subscribe((data: any) => {
      this.authService.user.next(data.user);
      this.router.navigate(['/dashboard-default']);
    })
  }
}
