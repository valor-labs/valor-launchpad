import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectPayComponent} from './direct-pay/direct-pay.component';
import {StripeUiRoutingModule} from './stripe-ui-routing.module';
import { StripeComponent } from './stripe/stripe.component';
import { EmbeddedPayComponent } from './embedded-pay/embedded-pay.component';
import {ReactiveFormsModule} from '@angular/forms';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {UiModule} from '@valor-launchpad/ui';
import { StripeButtonComponent } from './components/stripe-button/stripe-button.component';
import { StripeOrderItemComponent } from './order-summary/stripe-order-item/stripe-order-item.component';
import { StripeOrderItemsComponent } from './order-summary/stripe-order-items/stripe-order-items.component';
import { StripeOrderTotalComponent } from './order-summary/stripe-order-total/stripe-order-total.component';

@NgModule({
  imports: [CommonModule, StripeUiRoutingModule, ReactiveFormsModule, UiModule],
  declarations: [
    DirectPayComponent,
    StripeComponent,
    EmbeddedPayComponent,
    OrderSummaryComponent,
    StripeButtonComponent,
    StripeOrderItemComponent,
    StripeOrderItemsComponent,
    StripeOrderTotalComponent,
  ],
})
export class StripeUiModule {
}
