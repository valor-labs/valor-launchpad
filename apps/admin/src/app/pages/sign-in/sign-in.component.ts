import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { AuthService } from '../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TermsOfUseService } from '../terms-of-use';

@Component({
  selector: 'valor-launchpad-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public userName: string;
  firstName: string;
  lastName: string;
  public avatar: {
    src_webp: string;
    src: string;
    id: string;
  };
  public title: string;
  public isFirstLogin = true;
  public errorMessage: string;
  public isAlertOpen: boolean;
  public loading: boolean;
  fromNav: string;

  constructor(
    private signInService: SignInService,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private readonly activatedRoute: ActivatedRoute,
    private termsOfUseService: TermsOfUseService
  ) {
    this.userName = '';
    this.errorMessage = '';
    this.isAlertOpen = false;
    this.activatedRoute.queryParams.subscribe((param) => {
      this.fromNav = param['fromNav'];
    });
  }

  ngOnInit(): void {
    this.userName = this.cookieService.get('userName');
    this.firstName = this.cookieService.get('firstName');
    this.lastName = this.cookieService.get('lastName');
    this.avatar =
      this.cookieService.get('avatar') !== '' &&
      JSON.parse(this.cookieService.get('avatar'));
    this.isFirstLogin = this.userName === '';
    this.title = this.isFirstLogin
      ? 'Welcome'
      : `Welcome back, ${this.userName}`;
    if (this.authService.isLoggedIn() && !this.fromNav) {
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
        } else {
          this.errorMessage = res?.message;
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
