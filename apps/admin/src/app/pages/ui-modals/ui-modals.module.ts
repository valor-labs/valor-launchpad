import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModalsRoutingModule } from './ui-modals-routing.module';
import { UiModalsComponent } from './ui-modals.component';


@NgModule({
  declarations: [
    UiModalsComponent
  ],
  imports: [
    CommonModule,
    UiModalsRoutingModule
  ]
})
export class UiModalsModule { }
