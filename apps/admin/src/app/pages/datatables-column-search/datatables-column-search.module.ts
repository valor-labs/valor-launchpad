import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesColumnSearchRoutingModule } from './datatables-column-search-routing.module';
import { DatatablesColumnSearchComponent } from './datatables-column-search.component';

import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiModule } from '@valor-launchpad/ui';
@NgModule({
  declarations: [
    DatatablesColumnSearchComponent
  ],
  imports: [
    CommonModule,
    DatatablesColumnSearchRoutingModule,
    FormsModule,
    NgxDatatableModule,
    UiModule
  ]
})
export class DatatablesColumnSearchModule { }
