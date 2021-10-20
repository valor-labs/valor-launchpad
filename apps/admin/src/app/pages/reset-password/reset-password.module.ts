import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from '@valor-launchpad/ui';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './reset-password.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResetPasswordComponent],
  providers: [ResetPasswordService],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
  ],
})
export class ResetPasswordModule {}
