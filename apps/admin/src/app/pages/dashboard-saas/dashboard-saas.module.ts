import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@valor-launchpad/ui';

import { DashboardSaasRoutingModule } from './dashboard-saas-routing.module';
import { DashboardSaasComponent } from './dashboard-saas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SaasInfoCardComponent } from './saas-info-card/saas-info-card.component';

@NgModule({
  declarations: [DashboardSaasComponent, SaasInfoCardComponent],
  imports: [
    CommonModule,
    UiModule,
    DashboardSaasRoutingModule,
    NgxChartsModule,
    NgxDatatableModule,
  ],
})
export class DashboardSaasModule {}
