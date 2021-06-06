import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsFloatingLabelsComponent } from './forms-floating-labels.component';
import { FormsFloatingLabelsRoutingModule } from './forms-floating-labels-routing.module';



@NgModule({
  declarations: [
    FormsFloatingLabelsComponent
  ],
  imports: [
    CommonModule,
    FormsFloatingLabelsRoutingModule,
  ]
})
export class FormsFloatingLabelsModule { }
