import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'valor-launchpad-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  message = 'Please enter your username to reset your password.'
  constructor(private fb: FormBuilder, private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: [null, [Validators.required]],
    })
  }

  resetPassword() {
    for (const ctrl of Object.values(this.formGroup.controls)) {
      ctrl.markAsDirty();
    }
    if (this.formGroup.invalid) {
      return;
    }
    this.message = 'Requesting your password reset';
    this.resetPasswordService.resetPassword(this.formGroup.value.username).subscribe(()=>{
      this.message = 'Your password has been reset please check your email!'
    }, () => {
      this.message = 'Something went wrong'
    })
  }
}
