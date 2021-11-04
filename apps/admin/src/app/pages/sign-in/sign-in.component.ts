import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'valor-launchpad-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public userName: string;
  public avatar: string;
  public title: string;
  public isFirstLogin: boolean;
  public errorMessage: string;
  public isAlertOpen: boolean;
  public loading: boolean;

  constructor(
    private signInService: SignInService,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.userName = '';
    this.errorMessage = '';
    this.isAlertOpen = false;
  }

  ngOnInit(): void {
    this.userName = this.cookieService.get('userName');
    this.avatar = this.cookieService.get('avatar');
    this.isFirstLogin = this.userName !== '' ? false : true;
    this.title =
      this.userName !== '' ? `Welcome back, ${this.userName}` : 'Welcome';

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard-default']);
    }
  }

  async signIn(form) {
    this.loading = true;
    (await this.signInService.login(form.value)).subscribe(
      (res) => {
        if (res?.message === 'Unauthorized') {
          this.errorMessage = 'Incorrect username or password';
          this.isAlertOpen = true;
        }
        if (
          localStorage.getItem('preUrl') &&
          localStorage.getItem('preUrl') !== '/sign-in'
        ) {
          this.router.navigate([localStorage.getItem('preUrl')]);
        } else {
          this.router.navigate(['/dashboard-default']);
        }
        this.loading = false;
      },
      (err) => {
        this.errorMessage = err;
        this.loading = false;
      }
    );
  }

  onClose(event) {
    this.isAlertOpen = event;
  }
}
