import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { ResetNewPasswordService } from './reset-new-password.service';
import { UserEntity } from '@valor-launchpad/common-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap, switchMap, } from 'rxjs/operators';
import { defer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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


@Component({
  selector: 'valor-launchpad-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.scss']
})
export class ResetNewPasswordComponent implements OnInit, OnDestroy {
  username = '';
  resetPasswordformGroup: FormGroup;
  token = '';
  private destroy$ = new Subject();
  constructor(private fb: FormBuilder, private authService: AuthService, private resetNewPasswordService: ResetNewPasswordService, private router: Router, private route: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.resetPasswordformGroup = this.fb.group({
      username: [{ value: '', disabled: true }],
      password: ['', [Validators.required]],
      confirmPassword: ['', [confirmPasswordValidator()]]
    })
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  init() {
    this.route.queryParamMap.pipe(
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
        })
      })
    ).subscribe();
  }

  verifyPasswordResetToken(token) {
    return this.resetNewPasswordService.verifyPasswordResetToken(token).pipe(
      tap((data) => {
        if (data?.success) {
          this.username = data?.data?.username;
          this.resetPasswordformGroup.get('username').setValue(this.username);
          this.toastrService.success(data?.message)
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
    )
  }

  trackUser() {
    return this.authService.getCurrentUser().pipe(
      tap((user: UserEntity) => {
        this.username = user.username;
        this.resetPasswordformGroup.get('username').setValue(this.username);
      }),
      takeUntil(this.destroy$)
    )
  }

  resetPassword() {
    if (this.resetPasswordformGroup.invalid) return;

    const { password } = this.resetPasswordformGroup.value;

    this.resetNewPasswordService.resetPassword(this.username, password, this.token).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: any) => {
      if (data?.success) {
        this.toastrService.success(data?.message);
        this.router.navigate(['/dashboard-default']);
      } else {
        this.toastrService.error(data?.message);
      }
    })
  }
}
