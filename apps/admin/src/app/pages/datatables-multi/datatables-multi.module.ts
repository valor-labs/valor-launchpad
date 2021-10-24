import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesMultiRoutingModule } from './datatables-multi-routing.module';
import { DatatablesMultiComponent } from './datatables-multi.component';
import { UiModule } from '@valor-launchpad/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { DragToSelectModule } from 'ngx-drag-to-select';


@NgModule({
  declarations: [
    DatatablesMultiComponent
  ],
  imports: [
    CommonModule,
    DatatablesMultiRoutingModule,
    UiModule,
    NgxDatatableModule,
    FormsModule,
    DragToSelectModule.forRoot()
  ]
})
export class DatatablesMultiModule { }
