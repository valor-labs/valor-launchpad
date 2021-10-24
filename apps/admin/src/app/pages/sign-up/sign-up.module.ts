import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, UiModule, SignUpRoutingModule, ReactiveFormsModule],
})
export class SignUpModule {}
