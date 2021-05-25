import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsWizardComponent } from './forms-wizard.component';
import { FormsWizardRoutingModule } from './forms-wizard-routing.module';
import { UiModule } from '../../../../../../libs/ui/src';

@NgModule({
  declarations: [
    FormsWizardComponent
  ],
  imports: [
    CommonModule,
    FormsWizardRoutingModule,
    UiModule,
  ]
})
export class FormsWizardModule { }
