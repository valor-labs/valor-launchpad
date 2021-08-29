import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesResponsiveRoutingModule } from './datatables-responsive-routing.module';
import { TableResponsiveComponent } from './table-responsive/table-responsive.component';
import { UiModule } from '@valor-launchpad/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableResponsiveComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DatatablesResponsiveRoutingModule,
    NgxDatatableModule,
    FormsModule
  ]
})
export class DatatablesResponsiveModule { }
