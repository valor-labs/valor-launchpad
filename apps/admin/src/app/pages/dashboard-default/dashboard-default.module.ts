import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDefaultRoutingModule } from './dashboard-default-routing.module';
import { DashboardDefaultComponent } from './dashboard-default.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardDefaultComponent
  ],
  imports: [
    CommonModule,
    DashboardDefaultRoutingModule,
    NgxChartsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxDatatableModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardDefaultModule { }
