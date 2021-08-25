import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesAjaxRoutingModule } from './datatables-ajax-routing.module';
import { DatatablesAjaxComponent } from './datatables-ajax.component';


@NgModule({
  declarations: [
    DatatablesAjaxComponent
  ],
  imports: [
    CommonModule,
    DatatablesAjaxRoutingModule
  ]
})
export class DatatablesAjaxModule { }
