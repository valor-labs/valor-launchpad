import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { ResetNewPasswordService } from './reset-new-password.service';
import { UserEntity } from '@valor-launchpad/common-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from "@angular/router";


function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control?.parent?.get('password');

    if (passwordControl) {
      const password = passwordControl.value;

      return password !== control.value ? {
        passwordNotEqual: {
          error: true
        }
      } : null;
    } else {
      return null;
    }

    return null;
  }
}

enum AlertType {
  SUCCESS = 'success',
  ERROR = 'danger'
}

@Component({
  selector: 'valor-launchpad-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.scss']
})
export class ResetNewPasswordComponent implements OnInit, OnDestroy {
  username = '';
  resetPasswordformGroup: FormGroup;
  isAlertOpen = false;
  message = '';
  alertType: AlertType = AlertType.SUCCESS;
  private destroy$ = new Subject();
  constructor(private fb: FormBuilder, private authService: AuthService, private resetNewPasswordService: ResetNewPasswordService, private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordformGroup = this.fb.group({
      username: [{ value: '', disabled: true }],
      password: ['', [Validators.required]],
      confirmPassword: ['', [confirmPasswordValidator()]]
    })
    this.trackUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackUser() {
    this.authService.getCurrentUser().pipe(
      takeUntil(this.destroy$)
    ).subscribe((user: UserEntity) => {
      this.username = user.username;
      this.resetPasswordformGroup.get('username').setValue(this.username);
    })
  }

  resetPassword() {

    if (this.resetPasswordformGroup.invalid) return;

    const { password } = this.resetPasswordformGroup.value;

    this.resetNewPasswordService.resetPassword(this.username, password).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: any) => {
      if (data?.success) {
        this.handleShowAlert(data?.message);
        this.router.navigate(['/dashboard-default']);
      } else {
        this.handleShowAlert(data?.message, AlertType.ERROR);
      }
    })
  }

  handleShowAlert(message, type = AlertType.SUCCESS) {
    this.isAlertOpen = true;
    this.message = message;
    this.alertType = type;
  }

  handleCloseAlert() {
    this.isAlertOpen = false;
    this.message = '';
  }

}
