import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SettingsPasswordService } from './settings-password.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
// import { PasswordValidator } from '../../../core/utils/passwordValidator';
import { VLCheckBoxOption } from '@valor-launchpad/ui';
import { map } from 'rxjs/operators';

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
  standardValidator: boolean;
  passwordControl: AbstractControl;
  validatorControl: AbstractControl;
  isLoading = false;
  verticalCheckboxOptions : VLCheckBoxOption[] = [
    {
      label: `min length 6 `,
      value: `minLength`,
    },
    {
      label: `max length 15`,
      value: `maxLength`,
    },
    {
      label: `include number`,
      value: `number`,
    },
    {
      label: `at least one uppercase`,
      value: `uppercase`,
    },
    {
      label: `at least one lowercase`,
      value: `lowercase`,
    },
    {
      label: `include special characters`,
      value: `characters`,
    },
  ];
  constructor(
    private fb: FormBuilder,
    private passwordService: SettingsPasswordService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        currentPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required]],
        vCheckboxControl: [null],
        confirmPassword: [null],
      },
      { validators: pwdValidator }
    );
    this.passwordControl = this.formGroup.get('newPassword');
    this.validatorControl = this.formGroup.get('vCheckboxControl');
    this.passwordValidator(this.validatorControl);
  }

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

  passwordValidator(control:AbstractControl) {
    const passwordValidator = {
      minLength: false,
      maxLength: false,
      uppercase: false,
      lowercase: false,
      characters: false
    }
    control.valueChanges.pipe(
      map(validator => {
        Object.keys(passwordValidator).forEach(key => {
          passwordValidator[key] = false;
        })
        validator.forEach(element => {
          passwordValidator[element] = true;
        });
        // TODO save this validator object to db
        return passwordValidator;
      })
    )
    .subscribe(res => {
      this.setValidation(res);
    })
  }

  setValidation (data) {
    this.passwordControl.clearValidators();
    Object.keys(data).forEach(key => {
      if (data[key]) {
        switch (key) {
          case 'minLength':
            this.passwordControl.addValidators(Validators.minLength(6));
            break;
          case 'maxLength':
            this.passwordControl.addValidators(Validators.maxLength(15));
            break;
          case 'number':
            this.passwordControl.addValidators(Validators.pattern(/\d/));
            break;
          case 'uppercase':
              this.passwordControl.addValidators(Validators.pattern(/(?=.*[A-Z])/));
              break;
          case 'lowercase':
            this.passwordControl.addValidators(Validators.pattern(/(?=.*[a-z])/));
            break;
          case 'characters':
            this.passwordControl.addValidators(Validators.pattern(/(?=.*[!@#$%^&*,./()';|?><:"])/));
            break;
          default:
            break;
        };
      }
      this.passwordControl.updateValueAndValidity({ onlySelf: true });
    });
  }
  // openStandardValidator() {
  //   this.standardValidator = true;
  //   this.passwordControl.setValidators([
  //     Validators.required,

  //   ]);
  //   this.passwordControl.updateValueAndValidity({ onlySelf: true });
  // }

  // closeStandardValidator() {
  //   this.standardValidator = false;
  //   this.passwordControl.setValidators([Validators.required]);
  //   this.passwordControl.updateValueAndValidity({ onlySelf: true });
  // }
}
