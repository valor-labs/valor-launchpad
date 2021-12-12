import { Bind, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  AllCountriesResponse,
  AllProductsResponse,
  CheckoutSessionInput,
  CheckoutSessionResponse,
  MethodsByCountryResponse,
  PaymentIndentsInput,
  PaymentIndentsResponse,
  PaymentIntentsStatusResponse,
  PaymentSourceInput,
  PaymentSourceResponse,
  PaymentSourceStatusResponse,
} from './stripe.model';
import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { User } from '@valor-launchpad/users-api';
import { RequestingUser } from '@valor-launchpad/api-interfaces';

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

@Controller('v1')
export class StripeController {

  constructor(private stripeService: StripeService) { }

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
      wechat: source.wechat,
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
      wechat: source.wechat,
      amount: source.amount,
      currency: source.currency,
    };
  }

  @Get('checkout_session/:id')
  @Bind(Param('id'))
  async getCheckoutSession(id: string) {
    return await this.stripeService.findCheckoutSession(id);
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: CheckoutSessionInput
  ): Promise<CheckoutSessionResponse> {
    const url = await this.stripeService.createCheckoutSession(body);
    return { url };
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

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@User() user: RequestingUser): DeepPartial<RequestingUser> {
    const { id, username, firstName, lastName, email, profile } = user;
    const { location, from, city, address, zip, locale } = profile;

    return {
      id, username, firstName, lastName, email,
      profile: {
        location, from, city, address, zip, locale
      }
    };
  }
}
