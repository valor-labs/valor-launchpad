import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { UiModule } from '@valor-launchpad/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { SettingsAccountComponent } from './settings-account/settings-account.component';
import { SettingsPasswordComponent } from './settings-password/settings-password.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AvatarSelectorComponent,
    SettingsAccountComponent,
    SettingsPasswordComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, ReactiveFormsModule, UiModule],
})
export class SettingsModule {}
