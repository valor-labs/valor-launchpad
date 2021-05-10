import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTabsRoutingModule } from './ui-tabs-routing.module';
import { UiTabsComponent } from './ui-tabs.component';


@NgModule({
  declarations: [
    UiTabsComponent
  ],
  imports: [
    CommonModule,
    UiTabsRoutingModule
  ]
})
export class UiTabsModule { }
