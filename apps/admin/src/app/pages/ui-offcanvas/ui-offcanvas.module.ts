import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiOffcanvasRoutingModule } from './ui-offcanvas-routing.module';
import { UiOffCanvasComponent } from './ui-offcanvas.component';


@NgModule({
  declarations: [UiOffCanvasComponent],
  imports: [
    CommonModule,
    UiOffcanvasRoutingModule
  ]
})
export class UiOffcanvasModule { }
