import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
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
  }

  createUser() {
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
