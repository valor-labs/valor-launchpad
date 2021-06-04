import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectPayComponent} from './direct-pay/direct-pay.component';
import {StripeUiRoutingModule} from './stripe-ui-routing.module';
import { StripeComponent } from './stripe/stripe.component';
import { EmbeddedPayComponent } from './embedded-pay/embedded-pay.component';
import {ReactiveFormsModule} from '@angular/forms';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [CommonModule, StripeUiRoutingModule, ReactiveFormsModule],
  declarations: [
    DirectPayComponent,
    StripeComponent,
    EmbeddedPayComponent,
    OrderSummaryComponent
  ],
})
export class StripeUiModule {
}
