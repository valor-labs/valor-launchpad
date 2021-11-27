import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsOfUseRoutingModule } from './terms-of-use-routing.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@valor-launchpad/ui';

@NgModule({
  declarations: [TermsOfUseComponent],
  imports: [
    UiModule,
    CommonModule,
    FormsModule,
    TermsOfUseRoutingModule,
    ReactiveFormsModule,
  ],
})
export class TermsOfUseModule {}
