import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@valor-launchpad/ui';

import { DashboardCryptoRoutingModule } from './dashboard-crypto-routing.module';
import { DashboardCryptoComponent } from './dashboard-crypto.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [DashboardCryptoComponent],
  imports: [
    CommonModule,
    DashboardCryptoRoutingModule,
    UiModule,
    NgxDatatableModule,
    NgApexchartsModule,
  ],
})
export class DashboardCryptoModule {}
