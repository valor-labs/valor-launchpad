import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAnalyticsRoutingModule } from './dashboard-analytics-routing.module';
import { DashboardAnalyticsService } from './dashboard-analytics.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardAnalyticsRoutingModule
  ],
  providers: [DashboardAnalyticsService]
})
export class DashboardAnalyticsModule { }
