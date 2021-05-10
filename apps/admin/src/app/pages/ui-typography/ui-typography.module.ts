import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTypographyRoutingModule } from './ui-typography-routing.module';
import { UiTypographyComponent } from './ui-typography.component';


@NgModule({
  declarations: [
    UiTypographyComponent
  ],
  imports: [
    CommonModule,
    UiTypographyRoutingModule
  ]
})
export class UiTypographyModule { }
