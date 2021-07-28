import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import {ResetPasswordService} from './reset-password.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  providers:[
    ResetPasswordService
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule
  ]
})
export class ResetPasswordModule { }
