import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VerifyUserRoutingModule} from './verify-user-routing.module';
import {VerifyUserComponent} from './verify-user.component';
import {VerifyUserService} from './verify-user.service';
import {UiModule} from '@valor-launchpad/ui';


@NgModule({
  declarations: [
    VerifyUserComponent
  ],
  providers: [
    VerifyUserService
  ],
  imports: [
    CommonModule,
    VerifyUserRoutingModule,
    UiModule
  ]
})
export class VerifyUserModule {
}
