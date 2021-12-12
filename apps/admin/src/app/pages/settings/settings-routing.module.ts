import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsAccountComponent } from './settings-account/settings-account.component';
import { SettingsPasswordComponent } from './settings-password/settings-password.component';
import { SettingsTermsOfUseComponent } from './settings-terms-of-use';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'account', component: SettingsAccountComponent },
      { path: 'password', component: SettingsPasswordComponent },
      { path: 'terms-of-use', component: SettingsTermsOfUseComponent },
      { path: '', redirectTo: 'account' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
