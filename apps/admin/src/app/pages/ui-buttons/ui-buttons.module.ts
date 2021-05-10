import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiButtonsRoutingModule } from './ui-buttons-routing.module';
import { UiButtonsComponent } from './ui-buttons.component';


@NgModule({
  declarations: [
    UiButtonsComponent
  ],
  imports: [
    CommonModule,
    UiButtonsRoutingModule
  ]
})
export class UiButtonsModule { }
