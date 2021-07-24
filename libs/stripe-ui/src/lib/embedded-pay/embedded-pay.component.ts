import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { EmbeddedPayService } from './embedded-pay.service';

import { FieldConfig } from '@valor-launchpad/ui';
import { DynamicFormComponent } from '@valor-launchpad/ui';
import {
  AllProductsResponse,
  MethodsByCountryResponse,
  PayMethod,
} from '@valor-launchpad/stripe-api';
import { OrderItem } from '../order-summary/order-summary.model';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { StripeUiService } from '../stripe-ui.service';
import {
  loadStripe,
  Stripe,
  StripeAuBankAccountElement,
  StripeCardElement,
  StripeElements,
  StripeEpsBankElement,
  StripeIbanElement,
  StripeIdealBankElement,
  StripeP24BankElement,
} from '@stripe/stripe-js';
import { finalize, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

const publicKey =
  'pk_test_51IyGuEAcm152H20WJusvJbWOGaqsdj4TXzS0cQtSEHD3jE9GGQJ0hay5Tn8i5h3IL8TShk4XKd5VghIKlHxo2gvT00IDgRx1Bu';

@Component({
  selector: 'valor-launchpad-embedded-pay',
  templateUrl: './embedded-pay.component.html',
  styleUrls: ['./embedded-pay.component.scss'],
})
export class EmbeddedPayComponent implements OnInit {
  private stripe: Stripe;
  stripeElements: StripeElements;
  orderItems: OrderItem[] = [];
  orderTotal = '0.0';
  subtotal = '0.0';
  submitButtonPayText = 'Pay';
  submitDisabled = true;
  errorText = '';
  paymentRequestVisible = false;
  confirmationMessage =
    'We just sent your receipt to your email address, and your items will be on their way shortly.';
  live = false;
  elements;
  receiverInfo;
  payMethods: MethodsByCountryResponse;

  selectedPayMethod: PayMethod;

  isProcessing = false;

  constructor(
    private embeddedPayService: EmbeddedPayService,
    private stripeUiService: StripeUiService
  ) {
    loadStripe(publicKey).then((res) => {
      if (!res) {
        console.error('Stripe init failed');
      } else {
        this.stripe = res;
        this.stripeElements = this.stripe.elements();
      }
    });
  }

  formConfig: FieldConfig[];

  private stateConfig = {
    type: 'input',
    subtype: 'text',
    label: 'State',
    name: 'state',
    placeholder: 'CA',
    validation: [Validators.required],
    errorMessage: () => 'The field is required',
  };

  ngOnInit(): void {
    this.embeddedPayService.getProducts().subscribe((products) => {
      this.displayPaymentSummary(products);
    });
    this.stripeUiService.getAllCountries().subscribe((allCountryOptions) => {
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
          errorMessage: () => 'The field is required',
        },
        {
          type: 'input',
          subtype: 'text',
          label: 'Email',
          name: 'email',
          placeholder: 'jenny@example.com',
          validation: [Validators.required, Validators.email],
          errorMessage: (errors) => {
            if (errors.email) {
              return 'Please input correct email';
            }
            return 'The field is required';
          },
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
          valueChanges: this.onCountryChange.bind(this),
        },
        {
          type: 'input',
          subtype: 'text',
          label: 'City',
          name: 'city',
          placeholder: 'San Francisco',
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
        },
        {
          type: 'input',
          subtype: 'text',
          label: 'ZIP',
          name: 'postal_code',
          placeholder: '94103',
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
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
  async submit(
    evt,
    mainForm: DynamicFormComponent,
    {
      card,
      sepa,
      ideal,
      eps,
      p24,
      becs,
    }: {
      card: StripeCardElement;
      sepa: StripeIbanElement;
      ideal: StripeIdealBankElement;
      eps: StripeEpsBankElement;
      p24: StripeP24BankElement;
      becs: StripeAuBankAccountElement;
    }
  ) {
    evt.preventDefault();
    const { invalid } = mainForm;
    if (invalid) {
      this.stripeUiService.loopFormGroup(mainForm.form);
      return;
    }

    const { name, email, country } = mainForm.value;

    console.log('selectedPayMethod is: ', this.selectedPayMethod); // GB33BUKB20201555555555
    this.isProcessing = true;

    if (this.selectedPayMethod === 'ach_credit_transfer') {
      this.stripeUiService
        .getPaymentSource({
          type: this.selectedPayMethod,
          currency: 'usd', // TODO
          email,
        })
        .subscribe((source) => console.log(source));
    } else {
      this.stripeUiService
        .getPaymentIndent({
          items: this.orderItems.map((i) => ({
            product_name: i.name,
            quantity: +i.quantity,
            unit_amount: i.lineItemRawPrice * 100,
            currency: 'usd',
          })),
          pay_method: this.selectedPayMethod,
        })
        .pipe(
          switchMap(({ client_secret: clientSecret, amount, currency, id }) => {
            switch (this.selectedPayMethod) {
              case 'card':
                // https://stripe.com/docs/js/payment_intents/confirm_card_payment
                return from(
                  this.stripe.confirmCardPayment(clientSecret, {
                    payment_method: { card, billing_details: { name } },
                  })
                );
              case 'sepa_debit':
                // https://stripe.com/docs/js/payment_intents/confirm_sepa_debit_payment
                return from(
                  this.stripe.confirmSepaDebitPayment(clientSecret, {
                    payment_method: {
                      sepa_debit: sepa,
                      billing_details: { name, email },
                    },
                  })
                );
              case 'au_becs_debit':
                // https://stripe.com/docs/payments/au-becs-debit/accept-a-payment
                return from(
                  this.stripe.confirmAuBecsDebitPayment(clientSecret, {
                    payment_method: {
                      au_becs_debit: becs,
                      billing_details: { name, email },
                    },
                  })
                );
              case 'ideal':
                // https://stripe.com/docs/js/payment_intents/confirm_ideal_payment
                return from(
                  this.stripe.confirmIdealPayment(clientSecret, {
                    payment_method: { ideal },
                    return_url: location.href,
                  })
                );
              case 'eps':
                // https://stripe.com/docs/payments/eps/accept-a-payment
                return from(
                  this.stripe.confirmEpsPayment(clientSecret, {
                    payment_method: { billing_details: { name }, eps },
                    return_url: window.location.href,
                  })
                );
              case 'p24':
                // https://stripe.com/docs/payments/p24/accept-a-payment
                return from(
                  this.stripe.confirmP24Payment(clientSecret, {
                    payment_method: { billing_details: { name, email }, p24 },
                    return_url: window.location.href,
                  })
                );
              case 'bancontact':
                // https://stripe.com/docs/payments/bancontact/accept-a-payment
                return from(
                  this.stripe.confirmBancontactPayment(clientSecret, {
                    payment_method: { billing_details: { name } },
                    return_url: window.location.href,
                  })
                );
              case 'sofort':
                // https://stripe.com/docs/payments/sofort/accept-a-payment
                return from(
                  this.stripe.confirmSofortPayment(clientSecret, {
                    payment_method: {
                      billing_details: { name, email },
                      sofort: { country },
                    },
                    return_url: window.location.href,
                  })
                );
              case 'alipay':
                return from(
                  this.stripe.confirmAlipayPayment(clientSecret, {
                    payment_method: {
                      billing_details: { name },
                    },
                    return_url: `${window.location.href}`,
                  })
                );
              case 'giropay':
                return from(
                  this.stripe.confirmGiropayPayment(clientSecret, {
                    payment_method: { billing_details: { name } },
                    return_url: `${window.location.href}`,
                  })
                );
              // case 'ach_credit_transfer':
              //   return from(
              //     this.stripe.createSource({
              //       type: 'ach_credit_transfer',
              //       amount,
              //       currency,
              //       owner: {
              //         name,
              //         email,
              //       },
              //       redirect: {
              //         return_url: `${window.location.href}?payment_intent=${id}`,
              //       },
              //       statement_descriptor: 'Stripe Payments Demo',
              //       metadata: {
              //         paymentIntent: id,
              //       },
              //     })
              //   );
            }
          }),
          finalize(() => (this.isProcessing = false))
        )
        .subscribe(
          (res) => {
            console.log({ res });
            if (res.error) {
              console.error(res.error);
            } else if (res.paymentIntent) {
              console.log(res.paymentIntent);
            } else {
              console.warn('Should not go here');
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  generate(mainForm: DynamicFormComponent) {
    mainForm.form.controls['name'].setValue('Ramiro Von');
    mainForm.form.controls['email'].setValue('Conrad_Murray@hotmail.com');
    mainForm.form.controls['address'].setValue('9392 Jaquan Locks');
    mainForm.form.controls['city'].setValue('Sarahborough');
    mainForm.form.controls['state']?.setValue('Hawaii');
    mainForm.form.controls['postal_code'].setValue('42341');
    // mainForm.form.controls['country'].setValue('US');
  }

  getPaymentTotal() {
    return Object.values(this.orderItems).reduce(
      (total, { lineItemRawPrice }) => {
        return total + lineItemRawPrice;
      },
      0
    );
  }

  // Format a price (assuming a two-decimal currency like EUR or USD for simplicity).
  formatPrice(amount, currency) {
    const price = (amount / 100).toFixed(2) as any as number;
    const numberFormat = new Intl.NumberFormat(['en-US'], {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
    });
    return numberFormat.format(price);
  }

  displayPaymentSummary(products: AllProductsResponse) {
    const randomQuantity = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let currency;
    // Build and append the line items to the payment summary.
    this.orderItems = products.map((p) => {
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
    this.submitButtonPayText = this.getSubmitBtnLabel(
      this.orderTotal,
      this.selectedPayMethod
    );
  }

  private onCountryChange(country) {
    const zipConfig = this.formConfig.find((i) => i.name === 'postal_code');
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
    this.embeddedPayService.getPayMethodsByCountry(country).subscribe((res) => {
      this.payMethods = res;
      this.selectedPayMethod = res[0].id;
    });
    // remove or add state
    if (country === 'US') {
      if (!this.formConfig.find((i) => i.name === this.stateConfig.name)) {
        this.formConfig.splice(5, 0, this.stateConfig);
        this.formConfig = [...this.formConfig];
      }
    } else {
      if (this.formConfig.find((i) => i.name === this.stateConfig.name)) {
        this.formConfig.splice(5, 1);
        this.formConfig = [...this.formConfig];
      }
    }
  }

  private getSubmitBtnLabel(
    total: string,
    paymentMethod: PayMethod,
    bankName?
  ): string {
    const name = this.payMethods?.find((m) => m.id === paymentMethod)?.name;
    let label = `Pay ${total}`;
    if (paymentMethod !== 'card') {
      label = `Pay ${total} with ${name}`;
    }
    if (paymentMethod === 'wechat') {
      label = `Generate QR code to pay ${total} with ${name}`;
    }
    if (['sepa_debit', 'au_becs_debit'].includes(paymentMethod) && bankName) {
      label = `Debit ${total} from ${bankName}`;
    }
    return label;
  }
}
