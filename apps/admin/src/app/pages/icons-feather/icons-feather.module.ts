import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsFeatherRoutingModule } from './icons-feather-routing.module';
import { IconsFeatherComponent } from './icons-feather.component';


@NgModule({
  declarations: [
    IconsFeatherComponent
  ],
  imports: [
    CommonModule,
    IconsFeatherRoutingModule
  ]
})
export class IconsFeatherModule { }
