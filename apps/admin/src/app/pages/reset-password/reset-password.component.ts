import { Component, OnInit } from '@angular/core';
import {ResetPasswordService} from './reset-password.service';

@Component({
  selector: 'valor-launchpad-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  message = 'Please enter your username to reset your password.'
  constructor(private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
  }

  resetPassword(resetPasswordForm){
    this.message = 'Requesting your password reset';
    this.resetPasswordService.resetPassword(resetPasswordForm.value.username).subscribe(result=>{
      this.message = 'Your password has been reset please check your email!'
    })
  }
}
