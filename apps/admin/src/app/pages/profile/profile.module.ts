import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { UiModule } from '@valor-launchpad/ui';
import { DashboardSocialModule } from '../dashboard-social/dashboard-social.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UiModule,
    DashboardSocialModule,
  ],
})
export class ProfileModule {}
