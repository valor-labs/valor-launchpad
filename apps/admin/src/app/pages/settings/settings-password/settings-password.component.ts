import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { SettingsPasswordService } from './settings-password.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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
  styleUrls: ['./settings-password.component.scss']
})
export class SettingsPasswordComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passwordService: SettingsPasswordService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        currentPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required]],
        confirmPassword: [null]
      },
      { validators: pwdValidator }
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  isLoading = false;

  saveChanges() {
    for (const ctrl of Object.values(this.formGroup.controls)) {
      ctrl.markAsDirty();
    }
    if (this.formGroup.invalid) {
      return;
    }
    const { currentPassword, newPassword } = this.formGroup.value;
    this.isLoading = true;
    this.passwordService.updatePassword(currentPassword, newPassword).subscribe(
      () => {
        this.toastrService.success('Password updated successfully');
        this.formGroup.reset();
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        this.toastrService.error(err.error.message);
        this.isLoading = false;
      }
    );
  }
}
