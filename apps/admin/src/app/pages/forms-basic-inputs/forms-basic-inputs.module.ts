import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsBasicInputsComponent } from './forms-basic-inputs.component';
import { FormsBasicInputsRoutingModule } from './forms-basic-inputs-routing.module';



@NgModule({
  declarations: [
    FormsBasicInputsComponent
  ],
  imports: [
    CommonModule,
    FormsBasicInputsRoutingModule,
  ]
})
export class FormsBasicInputsModule { }
