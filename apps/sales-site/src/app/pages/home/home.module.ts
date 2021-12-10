import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
// import { UiModule } from '@valor-launchpad/ui';
import { HomeComponent } from "./home.component";
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // UiModule,
  ]
})
export class HomeModule { }
