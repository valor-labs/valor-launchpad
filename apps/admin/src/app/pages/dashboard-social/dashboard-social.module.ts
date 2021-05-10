import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSocialRoutingModule } from './dashboard-social-routing.module';
import { DashboardSocialComponent } from './dashboard-social.component';


@NgModule({
  declarations: [
    DashboardSocialComponent
  ],
  imports: [
    CommonModule,
    DashboardSocialRoutingModule
  ]
})
export class DashboardSocialModule { }
