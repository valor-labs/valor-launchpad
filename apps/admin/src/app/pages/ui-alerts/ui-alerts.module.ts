import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiAlertsRoutingModule } from './ui-alerts-routing.module';
import {UiModule} from "@valor-launchpad/ui";
import {UiAlertsComponent} from "./ui-alerts.component";


@NgModule({
  declarations: [
    UiAlertsComponent
  ],
  imports: [
    CommonModule,
    UiAlertsRoutingModule,
    UiModule
  ]
})
export class UiAlertsModule { }
