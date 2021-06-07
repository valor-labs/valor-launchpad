import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { EmbeddedPayService } from './embedded-pay.service';

//TODO: Export these properly
import {FieldConfig} from '../../../../ui/src/lib/dynamic-form/models/field-config.interface';
import {DynamicFormComponent} from '../../../../ui/src/lib/dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'valor-launchpad-embedded-pay',
  templateUrl: './embedded-pay.component.html',
  styleUrls: ['./embedded-pay.component.scss']
})
export class EmbeddedPayComponent implements OnInit {
  lineItems = [];
  products = {};
  orderItems = [];
  orderTotal = 0.00;
  subtotal = 0.00;
  paymentIntent: any = {};
  submitButtonPayText = 'Pay';
  submitDisabled = true;
  errorText = '';
  paymentRequestVisible = false;
  confirmationMessage = 'We just sent your receipt to your email address, and your items will be on their way shortly.'
  live = false;
  elements;
  receiverInfo;


  payMethods: string[];

  constructor(
    private embeddedPayService: EmbeddedPayService,
  ) {
    this.createPaymentIntent(CONFIG.currency, this.lineItems);
  }

  formConfig: FieldConfig[];
  cardFormConfig: FieldConfig[] = [
    {
      label: 'Card',
      name: 'ccNum',
      type: 'input',
      subtype: 'text',
      placeholder: 'Number',
      validation: [Validators.required],
      errorMessage: () => 'The field is required'
    },
    {
      label: 'Exp',
      name: 'ccExp',
      type: 'input',
      subtype: 'text',
      placeholder: 'MM/YY',
      validation: [Validators.required],
      errorMessage: () => 'The field is required'
    },
    {
      label: 'CVC',
      name: 'cardNum',
      type: 'input',
      subtype: 'text',
      placeholder: 'CVC',
      validation: [Validators.required],
      errorMessage: () => 'The field is required'
    }
  ];
  sepaDirectDebitFormConfig: FieldConfig[] = [
    {
      label: 'IBAN',
      name: 'iban',
      type: 'input',
      subtype: 'text',
      placeholder: 'DE00 0000 0000 0000 0000 00',
      validation: [Validators.required],
      errorMessage: () => 'The field is required'
    },
  ];

  ngOnInit(): void {
    this.embeddedPayService.getProducts().subscribe(products => {
      this.products = products;
      this.displayPaymentSummary();
    });
    this.embeddedPayService.getPaymentIntents().subscribe(console.log);
    this.embeddedPayService.getAllCountries().subscribe(allCountryOptions => {
      this.formConfig = [
        {
          type: 'input',
          subtype: 'text',
          label: 'Name',
          name: 'name',
          placeholder: 'Jenny Rosen',
          validation: [Validators.required, Validators.min(1)],
          errorMessage: () => 'The field is required'
        },
        {
          type:'input',
          subtype: 'text',
          label:'Email',
          name:'email',
          placeholder: 'jenny@example.com',
          validation: [Validators.required, Validators.email],
          errorMessage: (errors) => {
            if (errors.email) {
              return 'Please input correct email';
            }
            return 'The field is required';
          }
        },
        {
          type: 'input',
          subtype: 'text',
          label: 'Address',
          name: 'address',
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
        },
        {
          type: 'select',
          subtype: 'select',
          label: 'Country',
          name: 'country',
          placeholder: '',
          options: allCountryOptions,
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
          valueChanges: (country) => {
            const zipConfig = this.formConfig.find(i => i.name === 'postal_code');
            switch (country) {
              case 'US':
                zipConfig.label = 'ZIP';
                zipConfig.placeholder = '94103';
                break;
              case 'GB':
                zipConfig.label = 'Postcode';
                zipConfig.placeholder = 'EC1V 9NR';
                break;
              case 'AU':
                zipConfig.label = 'Postcode';
                zipConfig.placeholder = '3000';
                break;
              default:
                zipConfig.label = 'Postal Code';
                zipConfig.placeholder = '94103';
                break;
            }
            this.payMethods = CountryPayments.find(i => i.country === country)?.methods || [];
            this.embeddedPayService.getPayMethodsByCountry(country).subscribe(console.log);
          }
        },
        {
          type:'input',
          subtype: 'text',
          label:'City',
          name:'city',
          placeholder: 'San Francisco',
          validation: [Validators.required],
          errorMessage: () => 'The field is required'
        },
        {
          type:'input',
          subtype: 'text',
          label:'State',
          name:'state',
          placeholder: 'CA',
          validation: [Validators.required], //TODO: Put this after country selection or simplify to a autocomplete address
          errorMessage: () => 'The field is required'
        },
        {
          type:'input',
          subtype: 'text',
          label:'ZIP',
          name:'postal_code',
          placeholder: '94103',
          validation: [Validators.required],
          errorMessage: () => 'The field is required'
        },
      ];
    });
  }

  /**
   * Handle the form submission.
   *
   * This uses Stripe.js to confirm the PaymentIntent using payment details collected
   * with Elements.
   *
   * Please note this form is not submitted when the user chooses the "Pay" button
   * or Apple Pay, Google Pay, and Microsoft Pay since they provide name and
   * shipping information directly.
   */
  async submit(mainForm: DynamicFormComponent) {
    const { invalid } = mainForm.form;
    if (invalid) {
      loop(mainForm.form);
      return;
    }
    // todo: check if payment form is valid with country field
  }

  generate(mainForm: DynamicFormComponent) {
    mainForm.form.controls['name'].setValue('Ramiro Von')
    mainForm.form.controls['email'].setValue('Conrad_Murray@hotmail.com')
    mainForm.form.controls['address'].setValue('9392 Jaquan Locks')
    mainForm.form.controls['city'].setValue('Sarahborough')
    mainForm.form.controls['state'].setValue('Hawaii')
    mainForm.form.controls['postal_code'].setValue('42341')
    mainForm.form.controls['country'].setValue('US')
  }

  getPaymentTotal() {
    return Object.values(this.lineItems).reduce(
      (total, {lineItemRawPrice}) => {
        return total + lineItemRawPrice;
      },
      0
    );
  }

  // Create the PaymentIntent with the cart details.
  async createPaymentIntent(currency, items) {
    try {
      const response = await fetch('/api/stripe/v1/payment_intents', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          currency,
          items,
        }),
      });
      const data = await response.json();
      if (data.error) {
        return {error: data.error};
      } else {
        this.paymentIntent.client_secret = data.clientSecret
      }
    } catch (err) {
      return {error: err.message};
    }
  }

  // Format a price (assuming a two-decimal currency like EUR or USD for simplicity).
  formatPrice(amount, currency): number {
    const price = (amount / 100).toFixed(2) as any as number;
    const numberFormat = new Intl.NumberFormat(['en-US'], {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
    });
    return numberFormat.format(price) as any as number;
  }

  //
  // // Manipulate the DOM to display the payment summary on the right panel.
  // // Note: For simplicity, we're just using template strings to inject data in the DOM,
  // // but in production you would typically use a library like React to manage this effectively.
  displayPaymentSummary() {
    let currency;
    // Build and append the line items to the payment summary.
    for (const [id, product] of Object.entries(this.products) as any) {
      const randomQuantity = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      product.quantity = randomQuantity(1, 2);
      product.sku = product.skus.data[0];
      product.lineItemRawPrice = product.sku.price * product.quantity
      product.skuPrice = this.formatPrice(product.sku.price, product.sku.currency);
      product.lineItemPrice = this.formatPrice(product.sku.price * product.quantity, product.sku.currency);
      this.orderItems.push(product);
      currency = product.sku.currency;
      this.lineItems.push({
        product: product.id,
        sku: product.sku.id,
        quantity: product.quantity,
        lineItemRawPrice: product.lineItemRawPrice
      });
    }
    // Add the subtotal and total to the payment summary.
    const total = this.formatPrice(this.getPaymentTotal(), currency);
    this.subtotal = total;
    this.orderTotal = total;
  }
}

const CONFIG = {
  // Default country for the checkout form.
  country: 'US',

  // Store currency.
  currency: 'eur',

  // Supported payment methods for the store.
  // Some payment methods support only a subset of currencies.
  // Make sure to check the docs: https://stripe.com/docs/sources
  paymentMethods: [
    {
      value: 'ach_credit_transfer',
      name: 'Bank Transfer'
    },
    {
      value: 'alipay',
      name: 'Alipay'
    },
    {
      value: 'bancontact',
      name: 'Bancontact'
    },
    {
      value: 'card',
      name: 'Card'
    },
    {
      value: 'eps',
      name: 'EPS'
    },
    {
      value: 'ideal',
      name: 'iDEAL'
    },
    {
      value: 'giropay',
      name: 'Giropay'
    },
    {
      value: 'multibanco',
      name: 'Multibanco'
    },
    {
      value: 'p24',
      name: 'Przelewy24'
    },
    {
      value: 'sofort',
      name: 'SOFORT'
    },
    {
      value: 'wechat',
      name: 'WeChat Pay'
    },
    {
      value: 'au_becs_debit',
      name: 'BECS Direct Debit'
    }
  ],

  // Shipping options for the Payment Request API.
  shippingOptions: [
    {
      id: 'free',
      label: 'Free Shipping',
      detail: 'Delivery within 5 days',
      amount: 0,
    },
    {
      id: 'express',
      label: 'Express Shipping',
      detail: 'Next day delivery',
      amount: 500,
    },
  ]
}

const CountryPayments = [
  {country: "AU", methods: ['card']},
  {country: "AT", methods: ['card', 'eps', 'sepa direct debit', 'sofort']},
  {country: "BE", methods: ['card', 'bancontact', 'sepa direct debit']},
  {country: "BR", methods: ['card']},
  {country: "CA", methods: ['card']},
  {country: "CN", methods: ['card']},
  {country: "DK", methods: ['card']},
  {country: "FI", methods: ['card']},
  {country: "FR", methods: ['card']},
  {country: "DE", methods: ['card']},
  {country: "HK", methods: ['card']},
  {country: "IE", methods: ['card']},
  {country: "IT", methods: ['card']},
  {country: "JP", methods: ['card']},
  {country: "LU", methods: ['card']},
  {country: "MY", methods: ['card']},
  {country: "MX", methods: ['card']},
  {country: "NL", methods: ['card']},
  {country: "NZ", methods: ['card']},
  {country: "NO", methods: ['card']},
  {country: "PL", methods: ['card']},
  {country: "PT", methods: ['card']},
  {country: "SG", methods: ['card']},
  {country: "ES", methods: ['card']},
  {country: "SE", methods: ['card']},
  {country: "CH", methods: ['card']},
  {country: "GB", methods: ['card']},
  {country: "US", methods: ['card']}
];

function loop(group: FormGroup) {
  for (const key of Object.keys(group.controls)) {
    group.controls[key].markAsDirty();
    group.controls[key].updateValueAndValidity();
  }
}
