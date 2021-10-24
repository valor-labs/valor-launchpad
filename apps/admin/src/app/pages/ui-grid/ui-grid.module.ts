import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiGridRoutingModule } from './ui-grid-routing.module';
import { UiGridComponent } from './ui-grid.component';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [UiGridComponent],
  imports: [CommonModule, UiGridRoutingModule, UiModule],
})
export class UiGridModule {}
