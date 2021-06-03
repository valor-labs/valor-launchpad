import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectPayComponent} from './direct-pay/direct-pay.component';
import {StripeUiRoutingModule} from './stripe-ui-routing.module';
import { StripeComponent } from './stripe/stripe.component';
import { EmbeddedPayComponent } from './embedded-pay/embedded-pay.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, StripeUiRoutingModule, ReactiveFormsModule],
  declarations: [
    DirectPayComponent,
    StripeComponent,
    EmbeddedPayComponent
  ],
})
export class StripeUiModule {
}
