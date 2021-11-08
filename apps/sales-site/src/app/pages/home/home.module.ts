import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { UiModule } from '@valor-launchpad/ui';

console.dir(UiModule);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiModule,
  ]
})
export class HomeModule { }
