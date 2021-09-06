import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsWizardComponent } from './forms-wizard.component';
import { FormsWizardRoutingModule } from './forms-wizard-routing.module';
import { UiModule } from "@valor-launchpad/ui";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormsWizardComponent
  ],
  imports: [
    CommonModule,
    FormsWizardRoutingModule,
    UiModule,
    ReactiveFormsModule
  ]
})
export class FormsWizardModule { }
