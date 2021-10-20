import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { UiModule } from '@valor-launchpad/ui';
import { PaymentDefaultComponent } from './payment-default/payment-default.component';

@NgModule({
  declarations: [PaymentsComponent, PaymentDefaultComponent],
  imports: [CommonModule, PaymentsRoutingModule, UiModule],
})
export class PaymentsModule {}
