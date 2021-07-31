import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsFontAwesomeRoutingModule } from './icons-font-awesome-routing.module';
import { IconsFontAwesomeComponent } from './icons-font-awesome.component';
import { UiModule } from '@valor-launchpad/ui';


@NgModule({
  declarations: [
    IconsFontAwesomeComponent
  ],
  imports: [
    CommonModule,
    IconsFontAwesomeRoutingModule,
    UiModule
  ]
})
export class IconsFontAwesomeModule { }
