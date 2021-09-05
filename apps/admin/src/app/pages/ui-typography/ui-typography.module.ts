import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTypographyRoutingModule } from './ui-typography-routing.module';
import { UiTypographyComponent } from './ui-typography.component';
import { UiModule } from "@valor-launchpad/ui";


@NgModule({
  declarations: [
    UiTypographyComponent
  ],
  imports: [
    CommonModule,
    UiTypographyRoutingModule,
    UiModule
  ]
})
export class UiTypographyModule { }
