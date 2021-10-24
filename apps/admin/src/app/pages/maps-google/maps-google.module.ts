import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsGoogleComponent } from './maps-google.component';
import { MapsGoogleRoutingModule } from './maps-google-routing.module';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [MapsGoogleComponent],
  imports: [CommonModule, MapsGoogleRoutingModule, UiModule],
})
export class MapsGoogleModule {}
