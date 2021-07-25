import { Bind, Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Stripe } from 'stripe';
import { RequestWithSession } from '@valor-launchpad/common-api';
import {
  AllCountriesResponse,
  AllProductsResponse,
  MethodsByCountryResponse,
  PaymentIndentsInput,
  PaymentIndentsResponse,
  PaymentIntentsStatusResponse,
  PaymentSourceInput,
  PaymentSourceResponse,
  PaymentSourceStatusResponse,
} from './stripe.model';
import { InjectStripe } from 'nestjs-stripe';
import { StripeService } from './stripe.service';

@Controller('v1')
export class StripeController {
  endpointSecret = 'whsec_CfYnVo8i3Q6h40NAxfmMvwIGTsEdBDmb';

  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    private stripeService: StripeService
  ) {}

  @Post('payment_intents')
  async createPaymentIntents(
    @Body() body: PaymentIndentsInput
  ): Promise<PaymentIndentsResponse> {
    const indent = await this.stripeService.createPaymentIndent(body);
    return {
      clientSecret: indent.client_secret,
      amount: indent.amount,
    };
  }

  @Post('payment_source')
  async createPaymentSource(
    @Body() body: PaymentSourceInput
  ): Promise<PaymentSourceResponse> {
    const source = await this.stripeService.createPaymentSource(body);
    return {
      id: source.id,
      ach_credit_transfer: source.ach_credit_transfer,
      multibanco: source.multibanco,
    };
  }

  @Get('payment_intents/:id/status')
  @Bind(Param('id'))
  async getPaymentIndentsStatus(
    id: string
  ): Promise<PaymentIntentsStatusResponse> {
    const paymentIntent = await this.stripeService.findPaymentIntent(id);
    return {
      status: paymentIntent.status,
      last_payment_error: paymentIntent.last_payment_error,
    };
  }

  @Get('payment_source/:id/status')
  @Bind(Param('id'))
  async getPaymentSourceStatus(
    id: string
  ): Promise<PaymentSourceStatusResponse> {
    const source = await this.stripeService.findPaymentSource(id);
    return {
      status: source.status,
      flow: source.flow,
      multibanco: source.multibanco,
      ach_credit_transfer: source.ach_credit_transfer,
      amount: source.amount,
      currency: source.currency,
    };
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
      success_url: `http://localhost:4200/success.html`,
      cancel_url: `http://localhost:4200/cancel.html`,
    });
    console.log(session['url']);
  }

  @Get('countries')
  async getAllCountries(): Promise<AllCountriesResponse> {
    return this.stripeService.findAllCountries();
  }

  @Get('countries/:countryId/pay-methods/:currency')
  @Bind(Param('countryId'), Param('currency'))
  async getPayMethodsByCountry(
    countryId: string,
    currency: string
  ): Promise<MethodsByCountryResponse> {
    return this.stripeService.findPayMethods(countryId, currency);
  }

  @Get('products')
  async getAllProducts(): Promise<AllProductsResponse> {
    return this.stripeService.findProducts();
  }
}
