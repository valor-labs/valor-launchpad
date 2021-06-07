import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import {Stripe} from 'stripe';
import {RequestWithSession} from '../../../../apps/api/src/common/RequestWithSession';

@Controller('v1')
export class StripeController {
  stripe: Stripe;
  endpointSecret = 'whsec_CfYnVo8i3Q6h40NAxfmMvwIGTsEdBDmb';

  constructor() {
    this.stripe = new Stripe('sk_test_51IyGuEAcm152H20W2X1CYZjtI2PAamDitY4gBlLVkoT8LeYc1WA3xT6dBCz1rOLmFEMfrqzo0AopbMwO6wVdxIvn00T63xshwx',
      {apiVersion: '2020-08-27'})
  }

  @Post('payment_intents')
  async createPaymentIntents(@Body() body, @Res() res) {
    const {items} = body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: this.calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
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

  calculateOrderAmount(items) {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
}
