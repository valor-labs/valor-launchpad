import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Stripe } from 'stripe';
import { RawBody } from '@valor-launchpad/common-api';
import { InjectStripe } from 'nestjs-stripe';

@Controller('v1')
export class StripeHooksController {
  endpointSecret = 'whsec_CfYnVo8i3Q6h40NAxfmMvwIGTsEdBDmb';

  constructor(@InjectStripe() private readonly stripe: Stripe) {}

  @Post('hooks')
  async stripeHook(
    @Body() body,
    @Req() request,
    @RawBody() rawBody,
    @Res() response
  ) {
    const sig = request.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig,
        this.endpointSecret
      );
    } catch (err) {
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
