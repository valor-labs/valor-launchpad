import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { SignInService } from './sign-in.service';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, FormsModule, UiModule, SignInRoutingModule],
  providers: [SignInService],
})
export class SignInModule {}
