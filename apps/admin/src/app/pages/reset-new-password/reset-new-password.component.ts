import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { ResetNewPasswordService } from './reset-new-password.service';
import { UserEntity } from '@valor-launchpad/common-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { defer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SettingsPasswordService } from '../settings/settings-password/settings-password.service';

function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control?.parent?.get('password');

    if (passwordControl) {
      const password = passwordControl.value;

      return password !== control.value
        ? {
            passwordNotEqual: {
              error: true,
            },
          }
        : null;
    } else {
      return null;
    }

    return null;
  };
}

@Component({
  selector: 'valor-launchpad-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.scss'],
})
export class ResetNewPasswordComponent implements OnInit, OnDestroy {
  username = '';
  resetPasswordformGroup: FormGroup;
  token = '';
  private destroy$ = new Subject();

  standardValidator: boolean;

  passwordControl: AbstractControl;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private resetNewPasswordService: ResetNewPasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private passwordService: SettingsPasswordService
  ) {}

  ngOnInit(): void {
    this.resetPasswordformGroup = this.fb.group({
      username: [{ value: '', disabled: true }],
      password: ['', [Validators.required]],
      confirmPassword: ['', [confirmPasswordValidator()]],
    });
    this.init();
    this.passwordControl = this.resetPasswordformGroup.get('password');
    this.passwordService.getPasswordValidation().subscribe((res) => {
      this.setValidation(res['passwordValidation']);
      this.setErrorMessage(res['passwordValidation']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  init() {
    this.route.queryParamMap
      .pipe(
        switchMap((queryParam: ParamMap) => {
          return defer(() => {
            const token = queryParam.get('token');
            const isCancel = queryParam.get('cancel');

            this.token = token;

            if (token && !isCancel) {
              return this.verifyPasswordResetToken(token);
            } else if (token && isCancel) {
              return this.cancelPasswordReset(token);
            } else {
              return this.trackUser();
            }
          });
        })
      )
      .subscribe();
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

  verifyPasswordResetToken(token) {
    return this.resetNewPasswordService.verifyPasswordResetToken(token).pipe(
      tap((data) => {
        if (data?.success) {
          this.username = data?.data?.username;
          this.resetPasswordformGroup.get('username').setValue(this.username);
          this.toastrService.success(data?.message);
        } else {
          this.toastrService.error(data?.message);
          this.router.navigate(['/sign-in']);
        }
      })
    );
  }

  cancelPasswordReset(token) {
    return this.resetNewPasswordService.cancelPasswordReset(token).pipe(
      tap((data) => {
        if (data?.success) {
          this.toastrService.success(data?.message);
          this.router.navigate(['/sign-in']);
        } else {
          this.toastrService.error(data?.message);
        }
      })
    );
  }

  trackUser() {
    return this.authService.getCurrentUser().pipe(
      tap((user: UserEntity) => {
        this.username = user.username;
        this.resetPasswordformGroup.get('username').setValue(this.username);
      }),
      takeUntil(this.destroy$)
    );
  }

  resetPassword() {
    console.log(this.passwordControl);
    if (this.resetPasswordformGroup.invalid) return;

    const { password } = this.resetPasswordformGroup.value;

    this.resetNewPasswordService
      .resetPassword(this.username, password, this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data?.success) {
          this.toastrService.success(data?.message);
          this.router.navigate(['/dashboard-default']);
        } else {
          this.toastrService.error(data?.message);
        }
      });
  }
}
