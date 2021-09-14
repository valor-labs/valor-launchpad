import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardDefaultRoutingModule} from './dashboard-default-routing.module';
import {DashboardDefaultComponent} from './dashboard-default.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AuthModule} from '../../core/auth/auth.module';
import {UiModule} from "@valor-launchpad/ui";


@NgModule({
  declarations: [
    DashboardDefaultComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    DashboardDefaultRoutingModule,
    NgxChartsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxDatatableModule,
    UiModule
  ]
})
export class DashboardDefaultModule {
}
