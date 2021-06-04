import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  addressForm: FormGroup;
  productsFetchPromise = null;
  stripe: any;
  paymentRequest;
  paymentIntent: any = {};
  activeCurrency = CONFIG.currency;
  // Global variable to store the submit button text.
  submitButtonDefaultText = 'Pay';
  submitButtonPayText = 'Pay';
  submitDisabled = true;
  errorText = '';
  mainClasses = [];
  paymentRequestVisible = false;
  confirmationMessage = 'We just sent your receipt to your email address, and your items will be on their way shortly.'
  live = false;
  elements;
  card;
  zipspan = 'ZIP';
  zipplaceholder = '94103';
  config;
  iban;
  idealBank;
  becsBank;
  receiverInfo;

  constructor(private readonly elementRef: ElementRef,
              private renderer: Renderer2, private formBuilder: FormBuilder) {
    this.config = CONFIG;
    this.displayPaymentSummary();
    this.createPaymentIntent(CONFIG.currency, this.lineItems);
  }

  // updateSubmitButtonPayText(newText) {
  //   this.submitButtonPayText = newText;
  // };

  buildForm() {
    this.addressForm = this.formBuilder.group({
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
      payment: 'card'
    })
    this.addressForm.get('country').valueChanges.subscribe(newCountry => {
      this.selectCountry(newCountry)
    })
  }

  selectCountry(country) {
    //update currency if there's a currency for that country
    //TODO: Do i need to do more here, where to find these?
    if (country === 'AU') {
      this.activeCurrency = 'aud';
    } else {
      this.activeCurrency = CONFIG.currency;
    }

    // Trigger the methods to show relevant fields and payment methods on page load.
    this.showRelevantFormFields(country);
    this.showRelevantPaymentMethods(country);
  };

  showRelevantPaymentMethods(country) {
    //  TODO: Make this filter based on the payment providers available for currency
  };

  showRelevantFormFields(country) {
    // const zipLabel = form.querySelector('label.zip');
    // // Only show the state input for the United States.
    // zipLabel.parentElement.classList.toggle(
    //   'with-state',
    //   ['AU', 'US'].includes(country)
    // );
    // Update the ZIP label to make it more relevant for each country.
    // TODO: This should also update the formatting
    switch (country) {
      case 'US':
        this.zipspan = 'ZIP';
        this.zipplaceholder = '94103';
        break;
      case 'GB':
        this.zipspan = 'Postcode';
        this.zipplaceholder = 'EC1V 9NR';
        break;
      case 'AU':
        this.zipspan = 'Postcode';
        this.zipplaceholder = '3000';
        break;
      default:
        this.zipspan = 'Postal Code';
        this.zipplaceholder = '94103';
        break;
    }

    // // Update the 'City' to appropriate name
    // TODO: Add this back
    // const cityInput = form.querySelector('label.city input');
    // const citySpan = form.querySelector('label.city span');
    // switch (country) {
    //   case 'AU':
    //     citySpan.innerText = 'City / Suburb';
    //     cityInput.placeholder = 'Melbourne';
    //     break;
    //   default:
    //     citySpan.innerText = 'City';
    //     cityInput.placeholder = 'San Francisco';
    //     break;
    // }
  };

  ngOnInit(): void {
    this.buildForm();
    const script = this.renderer.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => {
      // @ts-ignore
      this.stripe = Stripe('pk_test_51IyGuEAcm152H20WJusvJbWOGaqsdj4TXzS0cQtSEHD3jE9GGQJ0hay5Tn8i5h3IL8TShk4XKd5VghIKlHxo2gvT00IDgRx1Bu');
      //The above code needs to come from somewhere not hardcoded
      this.elements = this.stripe.elements();
      const style = {
        base: {
          iconColor: '#666ee8',
          color: '#31325f',
          fontWeight: 400,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '15px',
          '::placeholder': {
            color: '#aab7c4',
          },
          ':-webkit-autofill': {
            color: '#666ee8',
          },
        },
      };

      /**
       * Implement a Stripe Card Element that matches the look-and-feel of the app.
       *
       * This makes it easy to collect debit and credit card payments information.
       */

      this.card = this.elements.create('card', {style});
      // Add an instance of the card Element into the `card-element` <div>.
      this.card.mount('#card-element');
      // TODO: Add this back for google pay / apple pay / microsoft pay
      // this.setupPaymentRequest();

      // Monitor change events on the Card Element to display any errors.
      this.card.on('change', ({error}) => {
        // const cardErrors = document.getElementById('card-errors');
        if (error) {
          // cardErrors.textContent = error.message;
          // cardErrors.classList.add('visible');
        } else {
          // cardErrors.classList.remove('visible');
        }
        // Re-enable the Pay button.
        this.submitDisabled = false;
      });

      /**
       * Implement a Stripe IBAN Element that matches the look-and-feel of the app.
       *
       * This makes it easy to collect bank account information.
       */

        // Create a IBAN Element and pass the right options for styles and supported countries.
      const ibanOptions = {
          style,
          supportedCountries: ['SEPA'],
        };
      this.iban = this.elements.create('iban', ibanOptions);

      // Mount the IBAN Element on the page.
      this.iban.mount('#iban-element');

      // Monitor change events on the IBAN Element to display any errors.
      this.iban.on('change', ({error, bankName}) => {
        const ibanErrors = document.getElementById('iban-errors');
        if (error) {
          ibanErrors.textContent = error.message;
          ibanErrors.classList.add('visible');
        } else {
          ibanErrors.classList.remove('visible');
          if (bankName) {
            this.updateButtonLabel('sepa_debit', bankName);
          }
        }
        // Re-enable the Pay button.
        this.submitDisabled = false;
      });

      /**
       * Add an iDEAL Bank selection Element that matches the look-and-feel of the app.
       *
       * This allows you to send the customer directly to their iDEAL enabled bank.
       */

      // Create a iDEAL Bank Element and pass the style options, along with an extra `padding` property.
      this.idealBank = this.elements.create('idealBank', {
        style: {base: Object.assign({padding: '10px 15px'}, style.base)},
      });

      // Mount the iDEAL Bank Element on the page.
      this.idealBank.mount('#ideal-bank-element');

      // /**
      //  * Implement a Stripe Payment Request Button Element.
      //  *
      //  * This automatically supports the Payment Request API (already live on Chrome),
      //  * as well as Apple Pay on the Web on Safari, Google Pay, and Microsoft Pay.
      //  * When of these two options is available, this element adds a “Pay” button on top
      //  * of the page to let users pay in just a click (or a tap on mobile).
      //  */
      //
      // // Make sure all data is loaded from the store to compute the payment amount.
      // await store.loadProducts();
      //
      // // Create the payment request.
      // const paymentRequest = stripe.paymentRequest({
      //   country: config.stripeCountry,
      //   currency: config.currency,
      //   total: {
      //     label: 'Total',
      //     amount: store.getPaymentTotal(),
      //   },
      //   requestShipping: true,
      //   requestPayerEmail: true,
      //   shippingOptions: config.shippingOptions,
      // });
      //
      // // Callback when a payment method is created.
      // paymentRequest.on('paymentmethod', async (event) => {
      //   // Confirm the PaymentIntent with the payment method returned from the payment request.
      //   const {error} = await stripe.confirmCardPayment(
      //     paymentIntent.client_secret,
      //     {
      //       payment_method: event.paymentMethod.id,
      //       shipping: {
      //         name: event.shippingAddress.recipient,
      //         phone: event.shippingAddress.phone,
      //         address: {
      //           line1: event.shippingAddress.addressLine[0],
      //           city: event.shippingAddress.city,
      //           postal_code: event.shippingAddress.postalCode,
      //           state: event.shippingAddress.region,
      //           country: event.shippingAddress.country,
      //         },
      //       },
      //     },
      //     {handleActions: false}
      //   );
      //   if (error) {
      //     // Report to the browser that the payment failed.
      //     event.complete('fail');
      //     handlePayment({error});
      //   } else {
      //     // Report to the browser that the confirmation was successful, prompting
      //     // it to close the browser payment method collection interface.
      //     event.complete('success');
      //     // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
      //     const response = await stripe.confirmCardPayment(
      //       paymentIntent.client_secret
      //     );
      //     handlePayment(response);
      //   }
      // });
      //
      // // Callback when the shipping address is updated.
      // paymentRequest.on('shippingaddresschange', (event) => {
      //   event.updateWith({status: 'success'});
      // });
      //
      // // Callback when the shipping option is changed.
      // paymentRequest.on('shippingoptionchange', async (event) => {
      //   // Update the PaymentIntent to reflect the shipping cost.
      //   const response = await store.updatePaymentIntentWithShippingCost(
      //     paymentIntent.id,
      //     store.getLineItems(),
      //     event.shippingOption
      //   );
      //   event.updateWith({
      //     total: {
      //       label: 'Total',
      //       amount: response.paymentIntent.amount,
      //     },
      //     status: 'success',
      //   });
      //   const amount = store.formatPrice(
      //     response.paymentIntent.amount,
      //     activeCurrency
      //   );
      //   updateSubmitButtonPayText(`Pay ${amount}`);
      // });
      //
      // // Create the Payment Request Button.
      // const paymentRequestButton = elements.create('paymentRequestButton', {
      //   paymentRequest,
      // });
      //
      // // Check if the Payment Request is available (or Apple Pay on the Web).
      // const paymentRequestSupport = await paymentRequest.canMakePayment();
      // if (paymentRequestSupport) {
      //   // Display the Pay button by mounting the Element in the DOM.
      //   paymentRequestButton.mount('#payment-request-button');
      //   // Replace the instruction.
      //   document.querySelector('.instruction span').innerText = 'Or enter';
      //   // Show the payment request section.
      //   document.getElementById('payment-request').classList.add('visible');
      // }

      /**
       * Add a BECS element that matches the look-and-feel of the app.
       *
       * This allows you to collect australian bank account details
       */

      this.becsBank = this.elements.create('auBankAccount', {style});

      // Mount the BECS element on the page.
      this.becsBank.mount('#becs-bank-element');

      // Monitor change events on the BECS Element to display any errors.
      this.becsBank.on('change', ({error, bankName}) => {
        const becsBankErrors = document.getElementById('becs-errors');
        if (error) {
          becsBankErrors.textContent = error.message;
          becsBankErrors.classList.add('visible');
        } else {
          becsBankErrors.classList.remove('visible');
          if (bankName) {
            this.updateButtonLabel('au_becs_debit', bankName);
          }
        }
        // Re-enable the Pay button.
        this.submitDisabled = false;
      });

    };
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

  updateButtonLabel(paymentMethod, bankName) {
    const amount = this.formatPrice(this.getPaymentTotal(), this.activeCurrency);
    const name = PAYMENT_METHODS[paymentMethod].name;
    let label = `Pay ${amount}`;
    if (paymentMethod !== 'card') {
      label = `Pay ${amount} with ${name}`;
    }
    if (paymentMethod === 'wechat') {
      label = `Generate QR code to pay ${amount} with ${name}`;
    }
    if (['sepa_debit', 'au_becs_debit'].includes(paymentMethod) && bankName) {
      label = `Debit ${amount} from ${bankName}`;
    }

    this.updateSubmitButtonPayText(label);
  };

  updateSubmitButtonPayText(newText) {
    // submitButton.textContent = newText;
    this.submitButtonPayText = newText;
  };

//  TODO: Add this back
//   async setupPaymentRequest() {
//     this.paymentRequest = this.stripe.paymentRequest({
//       country: CONFIG.country,
//       currency: CONFIG.currency,
//       total: {
//         label: 'Total',
//         amount: this.getPaymentTotal(),
//       },
//       requestShipping: true,
//       requestPayerEmail: true,
//       shippingOptions: CONFIG.shippingOptions,
//     });
//     this.paymentRequest.on('paymentmethod', async (event) => {
//       // Confirm the PaymentIntent with the payment method returned from the payment request.
//       const {error} = await this.stripe.confirmCardPayment(
//         this.paymentIntent.client_secret,
//         {
//           payment_method: event.paymentMethod.id,
//           shipping: {
//             name: event.shippingAddress.recipient,
//             phone: event.shippingAddress.phone,
//             address: {
//               line1: event.shippingAddress.addressLine[0],
//               city: event.shippingAddress.city,
//               postal_code: event.shippingAddress.postalCode,
//               state: event.shippingAddress.region,
//               country: event.shippingAddress.country,
//             },
//           },
//         },
//         {handleActions: false}
//       );
//       if (error) {
//         // Report to the browser that the payment failed.
//         event.complete('fail');
//         this.handlePayment({error});
//       } else {
//         // Report to the browser that the confirmation was successful, prompting
//         // it to close the browser payment method collection interface.
//         event.complete('success');
//         // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
//         const response = await this.stripe.confirmCardPayment(
//           this.paymentIntent.client_secret
//         );
//         this.handlePayment(response);
//       }
//     });
//
//     // Callback when the shipping address is updated.
//     this.paymentRequest.on('shippingaddresschange', (event) => {
//       event.updateWith({status: 'success'});
//     });
//
// // Callback when the shipping option is changed.
//     this.paymentRequest.on('shippingoptionchange', async (event) => {
//       // Update the PaymentIntent to reflect the shipping cost.
//       const response = await this.updatePaymentIntentWithShippingCost(
//         this.paymentIntent.id,
//         this.getLineItems(),
//         event.shippingOption
//       );
//       event.updateWith({
//         total: {
//           label: 'Total',
//           amount: response.paymentIntent.amount,
//         },
//         status: 'success',
//       });
//       const amount = this.formatPrice(
//         response.paymentIntent.amount,
//         this.activeCurrency
//       );
//       this.updateSubmitButtonPayText(`Pay ${amount}`);
//     });
//
//     // Create the Payment Request Button.
//     const paymentRequestButton = this.elements.create('paymentRequestButton', {
//       paymentRequest: this.paymentRequest
//     });
//
//     // Check if the Payment Request is available (or Apple Pay on the Web).
//     const paymentRequestSupport = await this.paymentRequest.canMakePayment();
//     //TODO: Find out why this isnt working
//     if (paymentRequestSupport) {
//       // Display the Pay button by mounting the Element in the DOM.
//       paymentRequestButton.mount('#payment-request-button');
//       // Replace the instruction.
//       // TODO: Possibly Add this back
//       // document.querySelector('.instruction span').innerText = 'Or enter';
//       // Show the payment request section.
//       this.paymentRequestVisible = true;
//     }
//   }

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
  async submit() {
    const payment = this.addressForm.controls['payment'].value;
    //TODO: remove this hardcoding
    const name = this.addressForm.controls['name'].value;
    const country = this.addressForm.controls['country'].value;
    const email = this.addressForm.controls['email'].value;
    const billingAddress = {
      line1: this.addressForm.controls['address'].value,
      postal_code: this.addressForm.controls['postal_code'].value
    };
    const shipping = {
      name,
      address: {
        line1: this.addressForm.controls['address'].value,
        city: this.addressForm.controls['city'].value,
        postal_code: this.addressForm.controls['postal_code'].value,
        state: this.addressForm.controls['state'].value,
        country: this.addressForm.controls['country'].value
      },
    };
    // Disable the Pay button to prevent multiple click events.
    this.submitDisabled = true;
    this.submitButtonPayText = 'Processing…';

    // Update Payment Intent if currency is different to default
    if (CONFIG.currency !== this.activeCurrency) {
      const response = await this.updatePaymentIntentCurrency(
        this.paymentIntent.id,
        this.activeCurrency,
        [payment]
      );

      if (response.error) {
        this.handleError(response);
        return;
      }
    }

    if (payment === 'card') {
      // Let Stripe.js handle the confirmation of the PaymentIntent with the card Element.
      const response = await this.stripe.confirmCardPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            card: this.card,
            billing_details: {
              name,
              address: billingAddress,
            },
          },
          shipping,
        }
      );
      this.handlePayment(response);
    } else if (payment === 'sepa_debit') {
      // Confirm the PaymentIntent with the IBAN Element.
      const response = await this.stripe.confirmSepaDebitPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            sepa_debit: this.iban,
            billing_details: {
              name,
              email,
            },
          },
        }
      );
      this.handlePayment(response);
    } else if (payment === 'p24') {
      const response = await this.stripe.confirmP24Payment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            billing_details: {
              name,
              email,
            },
          },
          return_url: window.location.href,
        }
      );
      this.handlePayment(response);
    } else if (payment === 'ideal') {
      // Confirm the PaymentIntent with the iDEAL Element.
      const response = await this.stripe.confirmIdealPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            ideal: this.idealBank,
            billing_details: {
              name,
              email,
            },
          },
          return_url: window.location.href,
        }
      );
      this.handlePayment(response);
    } else if (payment === 'bancontact') {
      const response = await this.stripe.confirmBancontactPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            billing_details: {
              name,
            },
          },
          return_url: window.location.href,
        }
      );
      this.handlePayment(response);
    } else if (payment === 'eps') {
      const response = await this.stripe.confirmEpsPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            billing_details: {
              name,
            },
          },
          return_url: window.location.href,
        }
      );
      this.handlePayment(response);
    } else if (payment === 'giropay') {
      const response = await this.stripe.confirmGiropayPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            billing_details: {
              name,
            },
          },
          return_url: window.location.href,
        }
      );
      this.handlePayment(response);
    } else if (payment === 'alipay') {
      const response = await this.stripe.confirmAlipayPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            billing_details: {
              name,
            },
          },
          return_url: window.location.href,
        }
      );
      this.handlePayment(response);
    } else if (payment == 'au_becs_debit') {
      const response = await this.stripe.confirmAuBecsDebitPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            au_becs_debit: this.becsBank,
            billing_details: {
              name,
              email,
            },
          },
        }
      );
      this.handlePayment(response);
    } else {
      // Prepare all the Stripe source common data.
      const sourceData = {
        type: payment,
        amount: this.paymentIntent.amount,
        currency: this.paymentIntent.currency,
        owner: {
          name,
          email,
        },
        redirect: {
          return_url: `${window.location.href}?payment_intent=${this.paymentIntent.id}`,
        },
        statement_descriptor: 'Stripe Payments Demo',
        metadata: {
          paymentIntent: this.paymentIntent.id,
        },
      };

      // // Add extra source information which are specific to a payment method.
      // switch (payment) {
      //   case 'sofort':
      //     // SOFORT: The country is required before redirecting to the bank.
      //     sourceData.sofort = {
      //       country,
      //     };
      //     break;
      //   case 'ach_credit_transfer':
      //     // ACH Bank Transfer: Only supports USD payments, edit the default config to try it.
      //     // In test mode, we can set the funds to be received via the owner email.
      //     sourceData.owner.email = `amount_${paymentIntent.amount}@example.com`;
      //     break;
      // }

      // Create a Stripe source with the common data and extra information.
      const {source} = await this.stripe.createSource(sourceData);
      this.handleSourceActivation(source);
    }
  }

  handleSourceActivation(source) {
    let amount;
    switch (source.flow) {
      case 'none':
        // Normally, sources with a `flow` value of `none` are chargeable right away,
        // but there are exceptions, for instance for WeChat QR codes just below.
        if (source.type === 'wechat') {
          // TODO: Add this back
          //   // Display the QR code.
          //   const qrCode = new QRCode('wechat-qrcode', {
          //     text: source.wechat.qr_code_url,
          //     width: 128,
          //     height: 128,
          //     colorDark: '#424770',
          //     colorLight: '#f8fbfd',
          //     correctLevel: QRCode.CorrectLevel.H,
          //   });
          //   // Hide the previous text and update the call to action.
          //   form.querySelector('.payment-info.wechat p').style.display = 'none';
          //   let amount = store.formatPrice(
          //     store.getPaymentTotal(),
          //     activeCurrency
          //   );
          //   updateSubmitButtonPayText(
          //     `Scan this QR code on WeChat to pay ${amount}`
          //   );
          //   // Start polling the PaymentIntent status.
          //   pollPaymentIntentStatus(paymentIntent.id, 300000);
          // } else {
          //   console.log('Unhandled none flow.', source);
        }
        break;
      case 'redirect':
        // Immediately redirect the customer.
        this.submitButtonPayText = 'Redirecting…';
        window.location.replace(source.redirect.url);
        break;
      case 'code_verification':
        // Display a code verification input to verify the source.
        break;
      case 'receiver':
        // Display the receiver address to send the funds to.
        this.mainClasses.push('success')
        this.mainClasses.push('receiver')
        // mainElement.classList.add('success', 'receiver');
        // const receiverInfo = confirmationElement.querySelector(
        //   '.receiver .info'
        // );
        amount = this.formatPrice(source.amount, this.activeCurrency);
        switch (source.type) {
          case 'ach_credit_transfer':
            // Display the ACH Bank Transfer information to the user.
            // eslint-disable-next-line no-case-declarations
            const ach = source.ach_credit_transfer;
            this.receiverInfo = `
              <ul>
                <li>
                  Amount:
                  <strong>${amount}</strong>
                </li>
                <li>
                  Bank Name:
                  <strong>${ach.bank_name}</strong>
                </li>
                <li>
                  Account Number:
                  <strong>${ach.account_number}</strong>
                </li>
                <li>
                  Routing Number:
                  <strong>${ach.routing_number}</strong>
                </li>
              </ul>`;
            break;
          case 'multibanco':
            // Display the Multibanco payment information to the user.
            // eslint-disable-next-line no-case-declarations
            const multibanco = source.multibanco;
            this.receiverInfo = `
              <ul>
                <li>
                  Amount (Montante):
                  <strong>${amount}</strong>
                </li>
                <li>
                  Entity (Entidade):
                  <strong>${multibanco.entity}</strong>
                </li>
                <li>
                  Reference (Referencia):
                  <strong>${multibanco.reference}</strong>
                </li>
              </ul>`;
            break;
          default:
            console.log('Unhandled receiver flow.', source);
        }
        // Poll the PaymentIntent status.
        this.pollPaymentIntentStatus(this.paymentIntent.id);
        break;
      default:
        // Customer's PaymentIntent is received, pending payment confirmation.
        break;
    }
  };

  async pollPaymentIntentStatus(paymentIntent, timeout = 30000, interval = 500, start = null) {
    start = start ? start : Date.now();
    const endStates = [
      'succeeded',
      'processing',
      'canceled',
      'requires_payment_method',
    ];
    // Retrieve the PaymentIntent status from our server.
    const rawResponse = await fetch(`payment_intents/${paymentIntent}/status`);
    const response = await rawResponse.json();
    const isTerminalState = this.paymentIntentTerminalState(response.paymentIntent);

    if (!isTerminalState && Date.now() < start + timeout) {
      // Not done yet. Let's wait and check again.
      setTimeout(
        this.pollPaymentIntentStatus,
        interval,
        paymentIntent,
        timeout,
        interval,
        start
      );
    } else {
      this.handlePayment(response);
      if (!isTerminalState) {
        // Status has not changed yet. Let's time out.
        console.warn(new Error('Polling timed out.'));
      }
    }
  };

  /**
   * Check if the PaymentIntent is in a 'terminal' status
   * and therefore if we should show an error in the UI
   */
  paymentIntentTerminalState({status, last_payment_error}) {
    const endStates = ['succeeded', 'processing', 'canceled'];
    const hasError = typeof last_payment_error !== 'undefined';

    return (
      endStates.includes(status) ||
      (status === 'requires_payment_method' && hasError)
    );
  };

  handlePayment(paymentResponse) {
    const {paymentIntent, error} = paymentResponse;

    if (error && error.type === 'validation_error') {
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'processing')
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'receiver')
      this.submitDisabled = false;
      this.submitButtonPayText = this.submitButtonDefaultText;
    } else if (error) {
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'processing')
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'receiver')
      this.errorText = error.message;
      this.mainClasses.push('error')
    } else if (paymentIntent.status === 'succeeded') {
      // Success! Payment is confirmed. Update the interface to display the confirmation screen.
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'processing')
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'receiver')
      // Update the note about receipt and shipping (the payment has been fully confirmed by the bank).
      this.confirmationMessage = 'We just sent your receipt to your email address, and your items will be on their way shortly.';
      this.mainClasses.push('success')
    } else if (paymentIntent.status === 'processing') {
      // Success! Now waiting for payment confirmation. Update the interface to display the confirmation screen.
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'processing')
      // Update the note about receipt and shipping (the payment is not yet confirmed by the bank).
      this.confirmationMessage = 'We’ll send your receipt and ship your items as soon as your payment is confirmed.';
      this.mainClasses.push('success')
    } else if (paymentIntent.status === 'requires_payment_method') {
      // Failure. Requires new PaymentMethod, show last payment error message.
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'processing')
      this.errorText =
        paymentIntent.last_payment_error || 'Payment failed';
      this.mainClasses.push('error');
    } else {
      // Payment has failed.
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'processing');
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'receiver');
      this.mainClasses = this.mainClasses.filter(cssClass => cssClass == 'success');
      this.mainClasses.push('error');
    }
  };

  handleError(updateResponse) {
    // handle any error
    const {paymentIntent, error} = updateResponse;

    const mainElement = document.getElementById('main');
    const confirmationElement = document.getElementById('confirmation');

    if (error && error.type === 'validation_error') {
      mainElement.classList.remove('processing');
      mainElement.classList.remove('receiver');
      this.submitDisabled = false;
      this.submitButtonPayText = this.submitButtonDefaultText;
    } else if (error) {
      mainElement.classList.remove('processing');
      mainElement.classList.remove('receiver');
      this.errorText = error.message;
      mainElement.classList.add('error');
    }
  };

  generate() {
    this.addressForm.controls['name'].setValue('Ramiro Von')
    this.addressForm.controls['email'].setValue('Conrad_Murray@hotmail.com')
    this.addressForm.controls['address'].setValue('9392 Jaquan Locks')
    this.addressForm.controls['city'].setValue('Sarahborough')
    this.addressForm.controls['state'].setValue('Hawaii')
    this.addressForm.controls['postal_code'].setValue('42341')
    this.addressForm.controls['country'].setValue('US')
  }

  getPaymentTotal() {
    return Object.values(this.lineItems).reduce(
      (total, {lineItemRawPrice}) => {
        return total + lineItemRawPrice;
      },
      0
    );
  }

  //
  // Expose the line items for the payment using products and skus stored in Stripe.
  getLineItems() {
    const items = [];
    this.lineItems.forEach(item =>
      items.push({
        type: 'sku',
        parent: item.sku,
        quantity: item.quantity,
      })
    );
    return items;
  }

  // Retrieve the configuration from the API.
  async getConfig() {
    try {
      const response = await fetch('/config');
      const config = await response.json();
      this.live = config.stripePublishableKey.includes('live')
      return config;
    } catch (err) {
      return {error: err.message};
    }
  }

  // Retrieve a SKU for the Product where the API Version is newer and doesn't include them on v1/product
  async loadSkus(product_id) {
    try {
      const response = await fetch(`/products/${product_id}/skus`);
      const skus = await response.json();
      this.products[product_id].skus = skus;
    } catch (err) {
      return {error: err.message};
    }
  }

  // Load the product details.
  async loadProducts() {
    this.products = PRODUCTS;
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

  // Create the PaymentIntent with the cart details.
  async updatePaymentIntentWithShippingCost(
    paymentIntent,
    items,
    shippingOption
  ) {
    try {
      const response = await fetch(
        `/payment_intents/${paymentIntent}/shipping_change`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            shippingOption,
            items,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        return {error: data.error};
      } else {
        return data;
      }
    } catch (err) {
      return {error: err.message};
    }
  }

  // Update the PaymentIntent with the the currency and payment value.
  async updatePaymentIntentCurrency(
    paymentIntent,
    currency,
    payment_methods,
  ) {
    try {
      const response = await fetch(
        `/payment_intents/${paymentIntent}/update_currency`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            currency,
            payment_methods,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        return {error: data.error};
      } else {
        return data;
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
  async displayPaymentSummary() {
    // Fetch the products from the store to get all the details (name, price, etc.).
    await this.loadProducts();
    // const orderItems = document.getElementById('order-items');
    // const orderTotal = document.getElementById('order-total');
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

const PAYMENT_METHODS = {
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
  card: {
    name: 'Card',
    flow: 'none',
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
