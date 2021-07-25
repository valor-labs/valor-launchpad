import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { EmbeddedPayService } from './embedded-pay.service';

import { FieldConfig } from '@valor-launchpad/ui';
import { DynamicFormComponent } from '@valor-launchpad/ui';
import {
  AllProductsResponse,
  MethodsByCountryResponse,
  PayMethod,
  PayMethodID,
} from '@valor-launchpad/stripe-api';
import { OrderItem } from '../order-summary/order-summary.model';
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
import { finalize, switchMap, tap } from 'rxjs/operators';
import { from, partition, throwError } from 'rxjs';
import { fmtCurrency } from '../utils';
import { Router } from '@angular/router';

const publicKey =
  'pk_test_51IyGuEAcm152H20WJusvJbWOGaqsdj4TXzS0cQtSEHD3jE9GGQJ0hay5Tn8i5h3IL8TShk4XKd5VghIKlHxo2gvT00IDgRx1Bu';

const paymentStatusRoute = '/payments/stripe/status';

@Component({
  selector: 'valor-launchpad-embedded-pay',
  templateUrl: './embedded-pay.component.html',
  styleUrls: ['./embedded-pay.component.scss'],
})
export class EmbeddedPayComponent implements OnInit {
  private returnURL: string;
  private stripe: Stripe;
  stripeElements: StripeElements;
  orderItems: OrderItem[] = [];
  currency: string;
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
    private router: Router,
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
    this.returnURL =
      window.location.protocol +
      '//' +
      window.location.host +
      paymentStatusRoute;
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
    this.embeddedPayService
      .getProducts()
      .pipe(
        tap((products) => this.displayPaymentSummary(products)),
        switchMap(() => this.stripeUiService.getAllCountries())
      )
      .subscribe((allCountryOptions) => {
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

    const paymentIndent$ = this.stripeUiService.getPaymentIndent({
      items: this.orderItems.map((i) => ({
        product_name: i.name,
        quantity: +i.quantity,
        unit_amount: i.unitAmount,
        currency: this.currency,
      })),
      pay_method: this.selectedPayMethod.id,
    });

    const isReceiverFlow = this.selectedPayMethod.flow === 'receiver';

    const [receiverIndent$, confirmIndent$] = partition(
      paymentIndent$,
      () => isReceiverFlow
    );

    if (isReceiverFlow) {
      receiverIndent$
        .pipe(
          switchMap(({ amount }) => {
            if (this.selectedPayMethod.id === 'ach_credit_transfer') {
              return this.stripeUiService.getPaymentSource({
                type: this.selectedPayMethod.id,
                currency: this.currency,
                email,
              });
            } else if (this.selectedPayMethod.id === 'multibanco') {
              return this.stripeUiService.getPaymentSource({
                type: this.selectedPayMethod.id,
                currency: this.currency,
                email,
                amount,
              });
            } else {
              return throwError(
                `receiver flow should not contain ${this.selectedPayMethod.id}`
              );
            }
          }),
          finalize(() => (this.isProcessing = false))
        )
        .subscribe((source) => {
          // TODO: source redirect
          this.router.navigate(['payments', 'stripe', 'status'], {
            queryParams: { payment_source: source.id },
          });
        });
    } else {
      confirmIndent$
        .pipe(
          switchMap(({ clientSecret }) => {
            switch (this.selectedPayMethod.id) {
              case 'card':
                return from(
                  this.stripe.confirmCardPayment(clientSecret, {
                    payment_method: { card, billing_details: { name } },
                  })
                ).pipe(
                  tap(({ error, paymentIntent }) => {
                    if (!error) {
                      this.router.navigate(['payments', 'stripe', 'status'], {
                        queryParams: { payment_intent: paymentIntent.id },
                      });
                    }
                  })
                );
              case 'sepa_debit':
                return from(
                  this.stripe.confirmSepaDebitPayment(clientSecret, {
                    payment_method: {
                      sepa_debit: sepa,
                      billing_details: { name, email },
                    },
                  })
                );
              case 'au_becs_debit':
                return from(
                  this.stripe.confirmAuBecsDebitPayment(clientSecret, {
                    payment_method: {
                      au_becs_debit: becs,
                      billing_details: { name, email },
                    },
                  })
                );
              case 'ideal':
                return from(
                  this.stripe.confirmIdealPayment(clientSecret, {
                    payment_method: { ideal },
                    return_url: this.returnURL,
                  })
                );
              case 'eps':
                return from(
                  this.stripe.confirmEpsPayment(clientSecret, {
                    payment_method: { billing_details: { name }, eps },
                    return_url: this.returnURL,
                  })
                );
              case 'p24':
                return from(
                  this.stripe.confirmP24Payment(clientSecret, {
                    payment_method: { billing_details: { name, email }, p24 },
                    return_url: this.returnURL,
                  })
                );
              case 'bancontact':
                return from(
                  this.stripe.confirmBancontactPayment(clientSecret, {
                    payment_method: { billing_details: { name } },
                    return_url: this.returnURL,
                  })
                );
              case 'sofort':
                return from(
                  this.stripe.confirmSofortPayment(clientSecret, {
                    payment_method: {
                      billing_details: { name, email },
                      sofort: { country },
                    },
                    return_url: this.returnURL,
                  })
                );
              case 'alipay':
                return from(
                  this.stripe.confirmAlipayPayment(clientSecret, {
                    payment_method: {
                      billing_details: { name },
                    },
                    return_url: this.returnURL,
                  })
                );
              case 'giropay':
                return from(
                  this.stripe.confirmGiropayPayment(clientSecret, {
                    payment_method: { billing_details: { name } },
                    return_url: this.returnURL,
                  })
                );
            }
          }),
          finalize(() => (this.isProcessing = false))
        )
        .subscribe(
          ({ error }) => {
            if (error) {
              const payment_intent = error.payment_intent.id;
              this.router.navigate(['payments', 'stripe', 'status'], {
                queryParams: { payment_intent },
              });
            }
          },
          (error) => console.error(error)
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

  displayPaymentSummary(products: AllProductsResponse) {
    const randomQuantity = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    // Build and append the line items to the payment summary.
    this.orderItems = products.map((p) => {
      const qty = randomQuantity(1, 2);
      const sku = p.skus.data[0];
      this.currency = sku.currency;
      return {
        id: p.id,
        name: p.name,
        quantity: qty,
        sku: sku,
        unitAmount: sku.price,
        lineItemRawPrice: sku.price * qty,
        skuPrice: fmtCurrency(sku.price, sku.currency),
        lineItemPrice: fmtCurrency(sku.price * qty, sku.currency),
      };
    });
    // Add the subtotal and total to the payment summary.
    const total = fmtCurrency(this.getPaymentTotal(), this.currency);
    this.subtotal = total;
    this.orderTotal = total;
  }

  selectPayMethod(method: PayMethod) {
    this.selectedPayMethod = method;
    this.submitButtonPayText = this.getSubmitBtnLabel(
      this.orderTotal,
      this.selectedPayMethod.id
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
    this.embeddedPayService
      .getPayMethodsByCountry(country, this.currency)
      .subscribe((res) => {
        this.payMethods = res;
        this.selectPayMethod(res[0]);
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
    paymentMethod: PayMethodID,
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
