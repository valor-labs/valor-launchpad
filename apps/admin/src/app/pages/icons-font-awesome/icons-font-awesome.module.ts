import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsFontAwesomeRoutingModule } from './icons-font-awesome-routing.module';
import { IconsFontAwesomeComponent } from './icons-font-awesome.component';


@NgModule({
  declarations: [
    IconsFontAwesomeComponent
  ],
  imports: [
    CommonModule,
    IconsFontAwesomeRoutingModule
  ]
})
export class IconsFontAwesomeModule { }
