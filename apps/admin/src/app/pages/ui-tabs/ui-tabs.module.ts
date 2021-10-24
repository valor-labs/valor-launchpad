import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTabsRoutingModule } from './ui-tabs-routing.module';
import { UiTabsComponent } from './ui-tabs.component';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [UiTabsComponent],
  imports: [CommonModule, UiTabsRoutingModule, UiModule],
})
export class UiTabsModule {}
