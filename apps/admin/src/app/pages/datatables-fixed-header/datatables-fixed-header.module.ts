import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesFixedHeaderRoutingModule } from './datatables-fixed-header-routing.module';
import { DatatablesFixedHeaderComponent } from './datatables-fixed-header.component';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    DatatablesFixedHeaderComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    NgxDatatableModule,
    DatatablesFixedHeaderRoutingModule,
    FormsModule
  ]
})
export class DatatablesFixedHeaderModule { }
