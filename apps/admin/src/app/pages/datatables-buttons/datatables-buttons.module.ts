import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatablesButtonsRoutingModule } from './datatables-buttons-routing.module';
import { DatatablesButtonsComponent } from './datatables-buttons.component';


@NgModule({
  declarations: [
    DatatablesButtonsComponent
  ],
  imports: [
    CommonModule,
    DatatablesButtonsRoutingModule
  ]
})
export class DatatablesButtonsModule { }
