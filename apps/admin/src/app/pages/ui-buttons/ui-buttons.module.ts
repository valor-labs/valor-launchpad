import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiButtonsRoutingModule } from './ui-buttons-routing.module';
import { UiButtonsComponent } from './ui-buttons.component';
import { UiModule } from '@valor-launchpad/ui';


@NgModule({
  declarations: [
    UiButtonsComponent
  ],
  imports: [
    CommonModule,
    UiButtonsRoutingModule,
    UiModule
  ]
})
export class UiButtonsModule { }
