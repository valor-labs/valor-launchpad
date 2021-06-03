import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsBasicInputsComponent } from './forms-basic-inputs.component';
import { FormsBasicInputsRoutingModule } from './forms-basic-inputs-routing.module';
import { UiModule } from "@valor-launchpad/ui";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormsBasicInputsComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FormsBasicInputsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FormsBasicInputsModule { }
