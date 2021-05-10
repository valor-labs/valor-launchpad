import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDefaultRoutingModule } from './dashboard-default-routing.module';
import { DashboardDefaultComponent } from './dashboard-default.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    DashboardDefaultComponent
  ],
  imports: [
    CommonModule,
    DashboardDefaultRoutingModule,
    NgxChartsModule
  ]
})
export class DashboardDefaultModule { }
