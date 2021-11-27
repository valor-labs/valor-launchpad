import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { UiModule } from '@valor-launchpad/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { SettingsAccountComponent } from './settings-account/settings-account.component';
import { SettingsPasswordComponent } from './settings-password/settings-password.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SettingsTermsOfUseComponent } from './settings-terms-of-use';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    SettingsComponent,
    AvatarSelectorComponent,
    SettingsAccountComponent,
    SettingsPasswordComponent,
    SettingsTermsOfUseComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    UiModule,
    ModalModule,
    BsDropdownModule.forRoot(),
  ],
})
export class SettingsModule {}
