import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiOffcanvasRoutingModule } from './ui-offcanvas-routing.module';
import { UiOffCanvasComponent } from './ui-offcanvas.component';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [UiOffCanvasComponent],
  imports: [UiModule, CommonModule, UiOffcanvasRoutingModule],
})
export class UiOffcanvasModule {}
