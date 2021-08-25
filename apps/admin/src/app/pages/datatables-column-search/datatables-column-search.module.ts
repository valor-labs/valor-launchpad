import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesColumnSearchRoutingModule } from './datatables-column-search-routing.module';
import { DatatablesColumnSearchComponent } from './datatables-column-search.component';


@NgModule({
  declarations: [
    DatatablesColumnSearchComponent
  ],
  imports: [
    CommonModule,
    DatatablesColumnSearchRoutingModule
  ]
})
export class DatatablesColumnSearchModule { }
