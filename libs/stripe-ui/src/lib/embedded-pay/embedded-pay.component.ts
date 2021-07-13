import { Component, OnInit, ViewChild } from '@angular/core';
import {Validators} from '@angular/forms';
import { EmbeddedPayService } from './embedded-pay.service';

import {FieldConfig} from '@valor-launchpad/ui';
import {DynamicFormComponent} from '@valor-launchpad/ui';
import { AllProductsResponse, MethodsByCountryResponse, PayMethod } from '@valor-launchpad/stripe-api';
import { OrderItem } from '../order-summary/order-summary.model';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { StripeUiService } from '../stripe-ui.service';

@Component({
  selector: 'valor-launchpad-embedded-pay',
  templateUrl: './embedded-pay.component.html',
  styleUrls: ['./embedded-pay.component.scss']
})
export class EmbeddedPayComponent implements OnInit {
  orderItems: OrderItem[] = [];
  orderTotal = 0.00;
  subtotal = 0.00;
  submitButtonPayText = 'Pay';
  submitDisabled = true;
  errorText = '';
  paymentRequestVisible = false;
  confirmationMessage = 'We just sent your receipt to your email address, and your items will be on their way shortly.'
  live = false;
  elements;
  receiverInfo;
  payMethods: MethodsByCountryResponse;

  selectedPayMethod: PayMethod;

  @ViewChild('cardForm') cardForm: DynamicFormComponent;
  @ViewChild('sepaForm') sepaForm: DynamicFormComponent;

  constructor(
    private embeddedPayService: EmbeddedPayService,
    private stripeUiService: StripeUiService,
  ) {}

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

  private stateConfig = {
    type: 'input',
    subtype: 'text',
    label: 'State',
    name: 'state',
    placeholder: 'CA',
    validation: [Validators.required],
    errorMessage: () => 'The field is required'
  };

  ngOnInit(): void {
    this.embeddedPayService.getProducts().subscribe(products => {
      this.displayPaymentSummary(products);
    });
    this.stripeUiService.getAllCountries().subscribe(allCountryOptions => {
      const defaultCountry = 'US';
      // basic form without state
      // state config will be added automatically by `onCountryChange`
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
          value: defaultCountry,
          placeholder: '',
          options: allCountryOptions,
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
          valueChanges: this.onCountryChange.bind(this)
        },
        {
          type: 'input',
          subtype: 'text',
          label: 'City',
          name: 'city',
          placeholder: 'San Francisco',
          validation: [Validators.required],
          errorMessage: () => 'The field is required'
        },
        {
          type: 'input',
          subtype: 'text',
          label: 'ZIP',
          name: 'postal_code',
          placeholder: '94103',
          validation: [Validators.required],
          errorMessage: () => 'The field is required'
        },
      ];
      // trigger country change manually at the first time, in order to add state config to dynamic form
      this.onCountryChange(defaultCountry);
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
    const { invalid } = mainForm;
    if (invalid) {
      this.stripeUiService.loopFormGroup(mainForm.form);
      return;
    }
    const mapping: Partial<Record<PayMethod, () => DynamicFormComponent>> = {
      card: () => this.cardForm,
      sepa_debit: () => this.sepaForm,
    };
    const payForm = mapping[this.selectedPayMethod]();
    if (payForm) {
      if (payForm.invalid) {
        this.stripeUiService.loopFormGroup(payForm.form);
        return;
      }
    } else {
      // redirect
    }

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
    return Object.values(this.orderItems).reduce(
      (total, {lineItemRawPrice}) => {
        return total + lineItemRawPrice;
      },
      0
    );
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

  displayPaymentSummary(products: AllProductsResponse) {
    const randomQuantity = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let currency;
    // Build and append the line items to the payment summary.
    this.orderItems = products.map(p => {
      const qty = randomQuantity(1, 2);
      const sku = p.skus.data[0];
      currency = sku.currency;
      return {
        id: p.id,
        name: p.name,
        quantity: qty,
        sku: sku,
        lineItemRawPrice: sku.price * qty,
        skuPrice: this.formatPrice(sku.price, sku.currency),
        lineItemPrice: this.formatPrice(sku.price * qty, sku.currency),
      };
    });
    // Add the subtotal and total to the payment summary.
    const total = this.formatPrice(this.getPaymentTotal(), currency);
    this.subtotal = total;
    this.orderTotal = total;
  }


  selectPayMethod(event: TabDirective) {
    this.selectedPayMethod = event.id as PayMethod;
  }

  private onCountryChange(country) {
    const zipConfig = this.formConfig.find(i => i.name === 'postal_code');
    // replace label name
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
    // update pay methods tab
    this.embeddedPayService.getPayMethodsByCountry(country).subscribe(res => {
      this.payMethods = res;
      this.selectedPayMethod = res[0].id;
    });
    // remove or add state
    if (country === 'US') {
      if (!this.formConfig.find(i => i.name === this.stateConfig.name)) {
        this.formConfig.splice(5, 0, this.stateConfig);
        this.formConfig = [...this.formConfig];
      }
    } else {
      if (this.formConfig.find(i => i.name === this.stateConfig.name)) {
        this.formConfig.splice(5, 1);
        this.formConfig = [...this.formConfig];
      }
    }
  }
}
