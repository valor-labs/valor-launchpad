import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiEmbedVideoRoutingModule } from './ui-embed-video-routing.module';
import { UiEmbedVideoComponent } from './ui-embed-video.component';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [UiEmbedVideoComponent],
  imports: [CommonModule, UiEmbedVideoRoutingModule, UiModule],
})
export class UiEmbedVideoModule {}
