import {Component, OnInit} from '@angular/core';
import {SignInService} from "./sign-in.service";
import {AuthService} from "../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'valor-launchpad-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private signInService: SignInService, private authService: AuthService, private router: Router) {
  }

  signIn(form) {
    this.signInService.login(form.value)
  }

  ngOnInit(): void {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/dashboard-default']);
    // }
  }
}
