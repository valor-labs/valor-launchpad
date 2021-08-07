import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'valor-launchpad-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  message = 'Please enter your username to reset your password.'
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    })
  }

  resetPassword() {
    for (const ctrl of Object.values(this.formGroup.controls)) {
      ctrl.markAsDirty();
    }
    if (this.formGroup.invalid) {
      return;
    }
    console.log(this.formGroup.value);
  }
}
