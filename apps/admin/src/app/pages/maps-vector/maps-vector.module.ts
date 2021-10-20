import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@valor-launchpad/ui';

import { MapsVectorRoutingModule } from './maps-vector-routing.module';

import { MapsVectorComponent } from './maps-vector.component';

@NgModule({
  declarations: [MapsVectorComponent],
  imports: [CommonModule, MapsVectorRoutingModule, UiModule],
})
export class MapsVectorModule {}
