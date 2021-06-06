import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsFloatingLabelsComponent } from './forms-floating-labels.component';
import { FormsFloatingLabelsRoutingModule } from './forms-floating-labels-routing.module';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [
    FormsFloatingLabelsComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FormsFloatingLabelsRoutingModule,
  ]
})
export class FormsFloatingLabelsModule { }
