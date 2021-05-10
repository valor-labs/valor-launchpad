import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSaasRoutingModule } from './dashboard-saas-routing.module';
import { DashboardSaasComponent } from './dashboard-saas.component';


@NgModule({
  declarations: [
    DashboardSaasComponent
  ],
  imports: [
    CommonModule,
    DashboardSaasRoutingModule
  ]
})
export class DashboardSaasModule { }
