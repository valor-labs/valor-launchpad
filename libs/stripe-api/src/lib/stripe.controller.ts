import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import {Stripe} from 'stripe';
import {RequestWithSession} from '../../../../apps/api/src/common/RequestWithSession';

@Controller('v1')
export class StripeController {
  stripe: Stripe;
  endpointSecret='whsec_CfYnVo8i3Q6h40NAxfmMvwIGTsEdBDmb';
  constructor() {
    this.stripe = new Stripe('pk_test_51IyGuEAcm152H20WJusvJbWOGaqsdj4TXzS0cQtSEHD3jE9GGQJ0hay5Tn8i5h3IL8TShk4XKd5VghIKlHxo2gvT00IDgRx1Bu',
      {apiVersion: '2020-08-27'})
  }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body, @Req() req: RequestWithSession) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stubborn Attachments',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `localhost:4200/success.html`,
      cancel_url: `localhost:4200/cancel.html`,
    })
  }
}
