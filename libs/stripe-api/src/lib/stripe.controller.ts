import { Bind, Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import {Stripe} from 'stripe';
import {RequestWithSession} from '../../../../apps/api/src/common/RequestWithSession';
import { AllCountriesResponse } from './stripe.model';

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

  @Get('countries')
  async getAllCountries(): Promise<AllCountriesResponse> {
    return [
      {value: "AU", key: "Australia"},
      {value: "AT", key: "Austria"},
      {value: "BE", key: "Belgium"},
      {value: "BR", key: "Brazil"},
      {value: "CA", key: "Canada"},
      {value: "CN", key: "China"},
      {value: "DK", key: "Denmark"},
      {value: "FI", key: "Finland"},
      {value: "FR", key: "France"},
      {value: "DE", key: "Germany"},
      {value: "HK", key: "Hong Kong"},
      {value: "IE", key: "Ireland"},
      {value: "IT", key: "Italy"},
      {value: "JP", key: "Japan"},
      {value: "LU", key: "Luxembourg"},
      {value: "MY", key: "Malaysia"},
      {value: "MX", key: "Mexico"},
      {value: "NL", key: "Netherlands"},
      {value: "NZ", key: "New Zealand"},
      {value: "NO", key: "Norway"},
      {value: "PL", key: "Poland"},
      {value: "PT", key: "Portugal"},
      {value: "SG", key: "Singapore"},
      {value: "ES", key: "Spain"},
      {value: "SE", key: "Sweden"},
      {value: "CH", key: "Switzerland"},
      {value: "GB", key: "United Kingdom"},
      {value: "US", key: "United States"}
    ];
  }

  @Get('countries/:countryId/pay-methods')
  @Bind(Param('countryId'))
  async getPayMethodsByCountry(countryId: string) {
    const res = [];
    for (const [methodId, methodDetail] of Object.entries(PAYMENT_METHODS)) {
      if (!Reflect.has(methodDetail, 'countries')) {
        res.push({ ...methodDetail, id: methodId });
      } else if (methodDetail.countries.includes(countryId)) {
        res.push({ ...methodDetail, id: methodId });
      }
    }
    return res;
  }

  calculateOrderAmount(items) {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
}

interface MethodDetail {
  name: string;
  flow: string;
  countries?: string[];
  currencies?: string[];
}

const PAYMENT_METHODS: Record<string, MethodDetail> = {
  card: {
    name: 'Card',
    flow: 'none',
  },
  ach_credit_transfer: {
    name: 'Bank Transfer',
    flow: 'receiver',
    countries: ['US'],
    currencies: ['usd'],
  },
  alipay: {
    name: 'Alipay',
    flow: 'redirect',
    countries: ['CN', 'HK', 'SG', 'JP'],
    currencies: [
      'aud',
      'cad',
      'eur',
      'gbp',
      'hkd',
      'jpy',
      'nzd',
      'sgd',
      'usd',
    ],
  },
  bancontact: {
    name: 'Bancontact',
    flow: 'redirect',
    countries: ['BE'],
    currencies: ['eur'],
  },
  eps: {
    name: 'EPS',
    flow: 'redirect',
    countries: ['AT'],
    currencies: ['eur'],
  },
  ideal: {
    name: 'iDEAL',
    flow: 'redirect',
    countries: ['NL'],
    currencies: ['eur'],
  },
  giropay: {
    name: 'Giropay',
    flow: 'redirect',
    countries: ['DE'],
    currencies: ['eur'],
  },
  multibanco: {
    name: 'Multibanco',
    flow: 'receiver',
    countries: ['PT'],
    currencies: ['eur'],
  },
  p24: {
    name: 'Przelewy24',
    flow: 'redirect',
    countries: ['PL'],
    currencies: ['eur', 'pln'],
  },
  sepa_debit: {
    name: 'SEPA Direct Debit',
    flow: 'none',
    countries: [
      'FR',
      'DE',
      'ES',
      'BE',
      'NL',
      'LU',
      'IT',
      'PT',
      'AT',
      'IE',
      'FI',
    ],
    currencies: ['eur'],
  },
  sofort: {
    name: 'SOFORT',
    flow: 'redirect',
    countries: ['DE', 'AT'],
    currencies: ['eur'],
  },
  wechat: {
    name: 'WeChat',
    flow: 'none',
    countries: ['CN', 'HK', 'SG', 'JP'],
    currencies: [
      'aud',
      'cad',
      'eur',
      'gbp',
      'hkd',
      'jpy',
      'nzd',
      'sgd',
      'usd',
    ],
  },
  au_becs_debit: {
    name: 'BECS Direct Debit',
    flow: 'none',
    countries: ['AU'],
    currencies: ['aud'],
  },
};
