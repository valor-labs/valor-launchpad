import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAnalyticsRoutingModule } from './dashboard-analytics-routing.module';
import { DashboardAnalyticsComponent } from './dashboard-analytics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DashboardAnalyticsComponent],
  imports: [
    CommonModule,
    DashboardAnalyticsRoutingModule,
    UiModule,
    NgxDatatableModule,
    NgApexchartsModule,
    NgxChartsModule,
  ],
})
export class DashboardAnalyticsModule {}
