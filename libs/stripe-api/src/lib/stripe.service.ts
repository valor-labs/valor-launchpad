import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';
import { PaymentSourceInput } from '@valor-launchpad/stripe-api';

@Injectable()
export class StripeService {
  constructor(@InjectStripe() private readonly stripe: Stripe) {}
  async createPaymentSource(input: PaymentSourceInput) {
    if (input.type === 'ach_credit_transfer') {
      return this.stripe.sources.create({
        type: input.type,
        currency: input.currency,
        owner: { email: input.email },
      });
    } else {
      return this.stripe.sources.create({
        type: input.type,
        currency: input.currency,
        owner: { email: input.email },
        amount: input.amount,
      });
    }
  }
}
