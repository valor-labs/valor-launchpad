import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import {Stripe} from 'stripe';
import {RawBody} from '@valor-launchpad/common-api';

@Controller('v1')
export class StripeHooksController {
  stripe: Stripe;
  endpointSecret='whsec_CfYnVo8i3Q6h40NAxfmMvwIGTsEdBDmb';
  constructor() {
    this.stripe = new Stripe('sk_test_51IyGuEAcm152H20W2X1CYZjtI2PAamDitY4gBlLVkoT8LeYc1WA3xT6dBCz1rOLmFEMfrqzo0AopbMwO6wVdxIvn00T63xshwx',
      {apiVersion: '2020-08-27'})
  }

  @Post('hooks')
  async stripeHook(@Body() body, @Req() request, @RawBody() rawBody, @Res() response) {
    const sig = request.headers['stripe-signature'];

    let event:Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, sig, this.endpointSecret);
    }
    catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
      case 'payment_intent.created':
        console.log('Payment Intent Event');
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send(event);
  }
}
