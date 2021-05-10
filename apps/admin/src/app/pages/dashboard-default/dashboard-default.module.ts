import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDefaultRoutingModule } from './dashboard-default-routing.module';
import { DashboardDefaultComponent } from './dashboard-default.component';


@NgModule({
  declarations: [
    DashboardDefaultComponent
  ],
  imports: [
    CommonModule,
    DashboardDefaultRoutingModule
  ]
})
export class DashboardDefaultModule { }
