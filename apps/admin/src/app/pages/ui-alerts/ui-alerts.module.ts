import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiAlertsRoutingModule } from './ui-alerts-routing.module';
import { UiAlertsComponent } from './ui-alerts.component';


@NgModule({
  declarations: [
    UiAlertsComponent
  ],
  imports: [
    CommonModule,
    UiAlertsRoutingModule
  ]
})
export class UiAlertsModule { }
