import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from '../../core/auth/auth.service';
import {ENV_CONFIG, EnvironmentConfig} from '../../core/http/environment-config.interface';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig,
              private httpClient: HttpClient, private router: Router, private authService: AuthService) {
  }

  async login(signInForm) {
    this.httpClient.post(this.config.environment.apiBase + 'api/auth/v1/login', signInForm).subscribe((data: any) => {
      this.authService.user.next(data.user);
      this.router.navigate(['/dashboard-default']);
    })
  }
}
