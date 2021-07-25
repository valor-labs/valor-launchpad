import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectPayComponent } from './direct-pay/direct-pay.component';
import { StripeUiRoutingModule } from './stripe-ui-routing.module';
import { StripeComponent } from './stripe/stripe.component';
import { EmbeddedPayComponent } from './embedded-pay/embedded-pay.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { UiModule } from '@valor-launchpad/ui';
import { StripeButtonComponent } from './components/stripe-button/stripe-button.component';
import { StripeOrderItemComponent } from './order-summary/stripe-order-item/stripe-order-item.component';
import { StripeOrderItemsComponent } from './order-summary/stripe-order-items/stripe-order-items.component';
import { StripeOrderTotalComponent } from './order-summary/stripe-order-total/stripe-order-total.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { PaymentSepaComponent } from './components/payment-sepa/payment-sepa.component';
import { PaymentIdealComponent } from './components/payment-ideal/payment-ideal.component';
import { PaymentEpsComponent } from './components/payment-eps/payment-eps.component';
import { PaymentP24Component } from './components/payment-p24/payment-p24.component';
import { PaymentRedirectComponent } from './components/payment-redirect/payment-redirect.component';
import { PaymentBecsComponent } from './components/payment-becs/payment-becs.component';
import { PaymentReceiverComponent } from './components/payment-receiver/payment-receiver.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';

@NgModule({
  imports: [
    CommonModule,
    StripeUiRoutingModule,
    ReactiveFormsModule,
    UiModule,
    TabsModule,
  ],
  declarations: [
    DirectPayComponent,
    StripeComponent,
    EmbeddedPayComponent,
    OrderSummaryComponent,
    StripeButtonComponent,
    StripeOrderItemComponent,
    StripeOrderItemsComponent,
    StripeOrderTotalComponent,
    PaymentCardComponent,
    PaymentSepaComponent,
    PaymentIdealComponent,
    PaymentEpsComponent,
    PaymentP24Component,
    PaymentRedirectComponent,
    PaymentBecsComponent,
    PaymentReceiverComponent,
    PaymentStatusComponent,
  ],
})
export class StripeUiModule {}
