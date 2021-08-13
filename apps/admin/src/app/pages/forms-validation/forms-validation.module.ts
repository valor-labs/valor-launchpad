import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsValidationComponent } from './forms-validation.component';
import { FormsValidationRoutingModule } from './forms-validation-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [FormsValidationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsValidationRoutingModule,
    NgSelectModule,
    UiModule,
  ],
})
export class FormsValidationModule {}
