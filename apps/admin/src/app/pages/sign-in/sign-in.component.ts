import {Component, OnInit} from '@angular/core';
import {SignInService} from "./sign-in.service";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'valor-launchpad-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public userName: string;

  public title: string;

  constructor(private signInService: SignInService, private authService: AuthService, private router: Router, private cookieService: CookieService) {
    this.userName = '';
  }

  signIn(form) {
    this.signInService.login(form.value)
  }

  ngOnInit(): void {
    this.userName = this.cookieService.get('userName');
    this.title = this.userName !== '' ? `Welcome back, ${this.userName}` : 'Welcome';
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard-default']);
    }
  }
}
