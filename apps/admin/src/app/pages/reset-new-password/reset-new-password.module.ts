import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetNewPasswordComponent } from './reset-new-password.component';
import { ResetNewPasswordService } from './reset-new-password.service';

import { ResetNewPasswordRoutingModule } from './reset-new-password-routing.module';


@NgModule({
  declarations: [ResetNewPasswordComponent],
  providers: [
    ResetNewPasswordService
  ],
  imports: [
    UiModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResetNewPasswordRoutingModule
  ]
})
export class ResetNewPasswordModule { }
