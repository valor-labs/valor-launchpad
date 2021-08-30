import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@valor-launchpad/ui';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';

@NgModule({
  declarations: [InvoiceComponent],
  imports: [CommonModule, UiModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
