import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const pwdValidator: ValidatorFn = (fg: FormGroup) => {
  const newPassword = fg.get('newPassword');
  const confirmPassword = fg.get('confirmPassword');
  return newPassword.value === confirmPassword.value
    ? null
    : { pwdNotSame: true };
};

@Component({
  selector: 'valor-launchpad-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.scss'],
})
export class SettingsPasswordComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        currentPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required]],
        confirmPassword: [null],
      },
      { validators: pwdValidator }
    );
  }

  saveChanges() {
    for (const ctrl of Object.values(this.formGroup.controls)) {
      ctrl.markAsDirty();
    }
    if (this.formGroup.invalid) {
      return;
    }
    console.log(this.formGroup.value);
  }
}
