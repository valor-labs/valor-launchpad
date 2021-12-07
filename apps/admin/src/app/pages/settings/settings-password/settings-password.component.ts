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
import { VLCheckBoxOption } from '@valor-launchpad/ui';
import { map } from 'rxjs/operators';
const pwdValidator: ValidatorFn = (fg: FormGroup) => {
  const newPassword = fg.get('newPassword');
  const confirmPassword = fg.get('confirmPassword');
  return newPassword.value === confirmPassword.value
    ? null
    : { pwdNotSame: true };
};
export interface ValidationResult {
  [key: string]: boolean;
}

const DEFAULTE_VALIDATION = [
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
  validation: ValidationResult;
  verticalCheckboxOptions: VLCheckBoxOption[] = [];
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private passwordService: SettingsPasswordService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.validation = {
      minLength: false,
      maxLength: false,
      uppercase: false,
      lowercase: false,
      characters: false,
    };
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

    this.passwordService.getPasswordValidation().subscribe((res) => {
      if (res['passwordValidation']) {
        this.generatePasswordValidator(res['passwordValidation']);
        Object.keys(res['passwordValidation']).forEach((item) => {
          if (res['passwordValidation'][item] === true) {
            this.validatorControl.setValue([item]);
          }
        });
      }
    });
  }

  generatePasswordValidator(validation) {
    if (validation) {
      Object.keys(validation).forEach((item) => {
        const obj = {
          value: item,
          label: DEFAULTE_VALIDATION.find((element) => element.value === item)
            .label,
        };
        this.verticalCheckboxOptions.push(obj);
      });
    } else {
      this.verticalCheckboxOptions = DEFAULTE_VALIDATION;
    }
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
        this.passwordService
          .updatePasswordValidation(this.validation)
          .subscribe();
        this.formGroup.reset();
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        this.toastrService.error(err.error.message);
        this.isLoading = false;
      }
    );
  }

  passwordValidator(control: AbstractControl) {
    control.valueChanges
      .pipe(
        map((validator) => {
          Object.keys(this.validation).forEach((key) => {
            this.validation[key] = false;
          });
          validator?.forEach((element) => {
            this.validation[element] = true;
          });

          return this.validation;
        })
      )
      .subscribe((res) => {
        this.setValidation(res);
        this.setErrorMessage(res);
      });
  }

  setErrorMessage(data) {
    const validator = Object.keys(data).filter((key) => {
      return data[key] && key !== 'maxLength' && key !== 'minLength';
    });
    if (validator.length === 1) {
      this.errorMessage = `password must include at least one ${validator[0]}`;
    } else if (validator.length === 2) {
      this.errorMessage = `password must include at least one ${validator[0]} and ${validator[1]}`;
    } else if (validator.length === 3) {
      this.errorMessage = `password must include at least one ${validator[0]}, ${validator[1]} and ${validator[2]} `;
    } else {
      this.errorMessage =
        'password must include number, at least one uppercase, lowercase and special character';
    }
  }

  setValidation(data) {
    this.passwordControl.setValidators(Validators.required);
    Object.keys(data).forEach((key) => {
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
            this.passwordControl.addValidators(
              Validators.pattern(/(?=.*[A-Z])/)
            );
            break;
          case 'lowercase':
            this.passwordControl.addValidators(
              Validators.pattern(/(?=.*[a-z])/)
            );
            break;
          case 'characters':
            this.passwordControl.addValidators(
              Validators.pattern(/(?=.*[!@#$%^&*,./()';|?><:"])/)
            );
            break;
          default:
            break;
        }
      }
      this.passwordControl.updateValueAndValidity({ onlySelf: true });
    });
  }
}
