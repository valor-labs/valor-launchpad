import { Bind, Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import {Stripe} from 'stripe';
import {RequestWithSession} from '../../../../apps/api/src/common/RequestWithSession';
import { AllCountriesResponse, AllProductsResponse, MethodsByCountryResponse, PayMethod } from './stripe.model';

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
  async getPayMethodsByCountry(countryId: string): Promise<MethodsByCountryResponse> {
    const res: MethodsByCountryResponse = [];
    for (const [methodId, methodDetail] of Object.entries(PAYMENT_METHODS) as [PayMethod, MethodDetail][]) {
      if (!Reflect.has(methodDetail, 'countries')) {
        res.push({ ...methodDetail, id: methodId });
      } else if (methodDetail.countries.includes(countryId)) {
        res.push({ ...methodDetail, id: methodId });
      }
    }
    return res;
  }

  @Get('products')
  async getAllProducts(): Promise<AllProductsResponse> {
    return PRODUCTS as AllProductsResponse;
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

const PAYMENT_METHODS: Record<PayMethod, MethodDetail> = {
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

const PRODUCTS = [
  {
    'id': 'pins',
    'object': 'product',
    'active': true,
    'attributes': [
      'set'
    ],
    'caption': null,
    'created': 1513848330,
    'deactivate_on': [],
    'description': null,
    'images': [],
    'livemode': false,
    'metadata': {},
    'name': 'Stripe Pins',
    'package_dimensions': null,
    'shippable': true,
    'skus': {
      'object': 'list',
      'data': [
        {
          'id': 'pins-collector',
          'object': 'sku',
          'active': true,
          'attributes': {
            'set': 'Collector Set'
          },
          'created': 1513848331,
          'currency': 'eur',
          'image': null,
          'inventory': {
            'quantity': 500,
            'type': 'finite',
            'value': null
          },
          'livemode': false,
          'metadata': {},
          'package_dimensions': null,
          'price': 799,
          'product': 'pins',
          'updated': 1576268151
        }
      ],
      'has_more': false,
      'total_count': 1,
      'url': '/v1/skus?product=pins&active=true'
    },
    'type': 'good',
    'updated': 1552591126,
    'url': null
  },
  {
    'id': 'shirt',
    'object': 'product',
    'active': true,
    'attributes': [
      'size',
      'gender'
    ],
    'caption': null,
    'created': 1513848329,
    'deactivate_on': [],
    'description': null,
    'images': [],
    'livemode': false,
    'metadata': {},
    'name': 'Stripe Shirt',
    'package_dimensions': null,
    'shippable': true,
    'skus': {
      'object': 'list',
      'data': [
        {
          'id': 'shirt-small-woman',
          'object': 'sku',
          'active': true,
          'attributes': {
            'size': 'Small Standard',
            'gender': 'Woman'
          },
          'created': 1513848329,
          'currency': 'eur',
          'image': null,
          'inventory': {
            'quantity': null,
            'type': 'infinite',
            'value': null
          },
          'livemode': false,
          'metadata': {},
          'package_dimensions': null,
          'price': 999,
          'product': 'shirt',
          'updated': 1576255903
        }
      ],
      'has_more': false,
      'total_count': 1,
      'url': '/v1/skus?product=shirt&active=true'
    },
    'type': 'good',
    'updated': 1513848329,
    'url': null
  },
  {
    'id': 'increment',
    'object': 'product',
    'active': true,
    'attributes': [
      'issue'
    ],
    'caption': null,
    'created': 1513848327,
    'deactivate_on': [],
    'description': null,
    'images': [],
    'livemode': false,
    'metadata': {},
    'name': 'Increment Magazine',
    'package_dimensions': null,
    'shippable': true,
    'skus': {
      'object': 'list',
      'data': [
        {
          'id': 'increment-03',
          'object': 'sku',
          'active': true,
          'attributes': {
            'issue': 'Issue #3 “Development”'
          },
          'created': 1513848328,
          'currency': 'eur',
          'image': null,
          'inventory': {
            'quantity': null,
            'type': 'infinite',
            'value': null
          },
          'livemode': false,
          'metadata': {},
          'package_dimensions': null,
          'price': 399,
          'product': 'increment',
          'updated': 1576267451
        }
      ],
      'has_more': false,
      'total_count': 1,
      'url': '/v1/skus?product=increment&active=true'
    },
    'type': 'good',
    'updated': 1553885845,
    'url': null
  }
];
