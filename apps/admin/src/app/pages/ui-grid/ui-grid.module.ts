import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiGridRoutingModule } from './ui-grid-routing.module';
import { UiGridComponent } from './ui-grid.component';


@NgModule({
  declarations: [
    UiGridComponent
  ],
  imports: [
    CommonModule,
    UiGridRoutingModule
  ]
})
export class UiGridModule { }
