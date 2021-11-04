import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SettingsPasswordService } from '../settings/settings-password/settings-password.service';

@Component({
  selector: 'valor-launchpad-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    password: new FormControl('', [Validators.required]),
  });

  registerSucceed = false;

  errorMessage: string;

  passwordControl: AbstractControl;

  standardValidator: boolean;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private passwordService: SettingsPasswordService
  ) {}

  ngOnInit(): void {
    this.standardValidator = false;
    this.passwordControl = this.signUpFormGroup.get('password');
    this.signUpFormGroup
      .get('username')
      .valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter((val: string) => val && val.length > 0),
        switchMap((val: string) => this.authService.checkIfUsernameExists(val))
      )
      .subscribe(({ existedUsername }) => {
        if (existedUsername) {
          this.signUpFormGroup
            .get('username')
            .setErrors({ duplicateUsername: true });
        } else {
          this.signUpFormGroup.get('username').setErrors(null);
        }
      });
    this.passwordService.getPasswordValidation().subscribe((res) => {
      this.setValidation(res['passwordValidation']);
      this.setErrorMessage(res['passwordValidation']);
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

  createUser() {
    console.log(this.passwordControl);
    if (this.signUpFormGroup.invalid) {
      for (const ctrl of Object.values(this.signUpFormGroup.controls)) {
        ctrl.markAsDirty();
      }
      return;
    }
    this.authService.signUp(this.signUpFormGroup.value).subscribe(
      () => {
        this.registerSucceed = true;
      },
      () => {
        this.toastrService.error('Register failed, please try again.');
      }
    );
  }
}
