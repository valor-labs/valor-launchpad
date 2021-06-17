import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'valor-launchpad-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpFormGroup = new FormGroup({
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  checkUsername(username) {
    //  TODO: We need to check the username on a debounce as they type it
  }

  createUser(form) {
    if (form.valid) {
      this.authService.signUp(form.value)
    } else {
    //  TODO: do something with invalid form
    }
  }

}
