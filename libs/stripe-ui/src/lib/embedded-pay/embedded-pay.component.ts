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

  constructor(private readonly elementRef: ElementRef,
              private renderer: Renderer2, private formBuilder: FormBuilder) {
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
      country: 'US'
    })
  }

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
          // Add your base input styles here. For example:
          fontSize: '16px',
          color: '#32325d',
        },
      };

// Create an instance of the card Element.
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
    };
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

//TODO: Add this back
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

  async submit() {
    // const payment = this.addressForm.controls['payment'].value();
    //TODO: remove this hardcoding
    const payment = 'card';
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
    }
      // else if (payment === 'sepa_debit') {
      //   // Confirm the PaymentIntent with the IBAN Element.
      //   const response = await this.stripe.confirmSepaDebitPayment(
      //     this.paymentIntent.client_secret,
      //     {
      //       payment_method: {
      //         sepa_debit: this.iban,
      //         billing_details: {
      //           name,
      //           email,
      //         },
      //       },
      //     }
      //   );
      //   handlePayment(response);
      // }
      // else if (payment === 'p24') {
      //   const response = await stripe.confirmP24Payment(
      //     paymentIntent.client_secret,
      //     {
      //       payment_method: {
      //         billing_details: {
      //           name,
      //           email,
      //         },
      //       },
      //       return_url: window.location.href,
      //     }
      //   );
      //   handlePayment(response);
      // }
      // else if (payment === 'ideal') {
      //   // Confirm the PaymentIntent with the iDEAL Element.
      //   const response = await stripe.confirmIdealPayment(
      //     paymentIntent.client_secret,
      //     {
      //       payment_method: {
      //         ideal: idealBank,
      //         billing_details: {
      //           name,
      //           email,
      //         },
      //       },
      //       return_url: window.location.href,
      //     }
      //   );
      //   handlePayment(response);
      // }
      // else if (payment === 'bancontact') {
      //   const response = await stripe.confirmBancontactPayment(
      //     paymentIntent.client_secret,
      //     {
      //       payment_method: {
      //         billing_details: {
      //           name,
      //         },
      //       },
      //       return_url: window.location.href,
      //     }
      //   );
      //   handlePayment(response);
      // }
      // else if (payment === 'eps') {
      //   const response = await stripe.confirmEpsPayment(
      //     paymentIntent.client_secret,
      //     {
      //       payment_method: {
      //         billing_details: {
      //           name,
      //         },
      //       },
      //       return_url: window.location.href,
      //     }
      //   );
      //   handlePayment(response);
      // }
      // else if (payment === 'giropay') {
      //   const response = await stripe.confirmGiropayPayment(
      //     paymentIntent.client_secret,
      //     {
      //       payment_method: {
      //         billing_details: {
      //           name,
      //         },
      //       },
      //       return_url: window.location.href,
      //     }
      //   );
      //   handlePayment(response);
      // }
      // else if (payment === 'alipay') {
      //   const response = await stripe.confirmAlipayPayment(
      //     paymentIntent.client_secret,
      //     {
      //       payment_method: {
      //         billing_details: {
      //           name,
      //         },
      //       },
      //       return_url: window.location.href,
      //     }
      //   );
      //   handlePayment(response);
      // }
      // else if (payment == 'au_becs_debit') {
      //   const response = await stripe.confirmAuBecsDebitPayment(
      //     paymentIntent.client_secret,
      //     {
      //       payment_method: {
      //         au_becs_debit: becsBank,
      //         billing_details: {
      //           name,
      //           email,
      //         },
      //       },
      //     }
      //   );
      //   handlePayment(response);
    // }
    else {
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
          // case 'ach_credit_transfer':
          //   // Display the ACH Bank Transfer information to the user.
          //   const ach = source.ach_credit_transfer;
          //   receiverInfo.innerHTML = `
          //     <ul>
          //       <li>
          //         Amount:
          //         <strong>${amount}</strong>
          //       </li>
          //       <li>
          //         Bank Name:
          //         <strong>${ach.bank_name}</strong>
          //       </li>
          //       <li>
          //         Account Number:
          //         <strong>${ach.account_number}</strong>
          //       </li>
          //       <li>
          //         Routing Number:
          //         <strong>${ach.routing_number}</strong>
          //       </li>
          //     </ul>`;
          //   break;
          // case 'multibanco':
          //   // Display the Multibanco payment information to the user.
          //   const multibanco = source.multibanco;
          //   receiverInfo.innerHTML = `
          //     <ul>
          //       <li>
          //         Amount (Montante):
          //         <strong>${amount}</strong>
          //       </li>
          //       <li>
          //         Entity (Entidade):
          //         <strong>${multibanco.entity}</strong>
          //       </li>
          //       <li>
          //         Reference (Referencia):
          //         <strong>${multibanco.reference}</strong>
          //       </li>
          //     </ul>`;
          //   break;
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
   * Check if the PaymentIntent is in a "terminal" status
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
    "id": "pins",
    "object": "product",
    "active": true,
    "attributes": [
      "set"
    ],
    "caption": null,
    "created": 1513848330,
    "deactivate_on": [],
    "description": null,
    "images": [],
    "livemode": false,
    "metadata": {},
    "name": "Stripe Pins",
    "package_dimensions": null,
    "shippable": true,
    "skus": {
      "object": "list",
      "data": [
        {
          "id": "pins-collector",
          "object": "sku",
          "active": true,
          "attributes": {
            "set": "Collector Set"
          },
          "created": 1513848331,
          "currency": "eur",
          "image": null,
          "inventory": {
            "quantity": 500,
            "type": "finite",
            "value": null
          },
          "livemode": false,
          "metadata": {},
          "package_dimensions": null,
          "price": 799,
          "product": "pins",
          "updated": 1576268151
        }
      ],
      "has_more": false,
      "total_count": 1,
      "url": "/v1/skus?product=pins&active=true"
    },
    "type": "good",
    "updated": 1552591126,
    "url": null
  },
  {
    "id": "shirt",
    "object": "product",
    "active": true,
    "attributes": [
      "size",
      "gender"
    ],
    "caption": null,
    "created": 1513848329,
    "deactivate_on": [],
    "description": null,
    "images": [],
    "livemode": false,
    "metadata": {},
    "name": "Stripe Shirt",
    "package_dimensions": null,
    "shippable": true,
    "skus": {
      "object": "list",
      "data": [
        {
          "id": "shirt-small-woman",
          "object": "sku",
          "active": true,
          "attributes": {
            "size": "Small Standard",
            "gender": "Woman"
          },
          "created": 1513848329,
          "currency": "eur",
          "image": null,
          "inventory": {
            "quantity": null,
            "type": "infinite",
            "value": null
          },
          "livemode": false,
          "metadata": {},
          "package_dimensions": null,
          "price": 999,
          "product": "shirt",
          "updated": 1576255903
        }
      ],
      "has_more": false,
      "total_count": 1,
      "url": "/v1/skus?product=shirt&active=true"
    },
    "type": "good",
    "updated": 1513848329,
    "url": null
  },
  {
    "id": "increment",
    "object": "product",
    "active": true,
    "attributes": [
      "issue"
    ],
    "caption": null,
    "created": 1513848327,
    "deactivate_on": [],
    "description": null,
    "images": [],
    "livemode": false,
    "metadata": {},
    "name": "Increment Magazine",
    "package_dimensions": null,
    "shippable": true,
    "skus": {
      "object": "list",
      "data": [
        {
          "id": "increment-03",
          "object": "sku",
          "active": true,
          "attributes": {
            "issue": "Issue #3 “Development”"
          },
          "created": 1513848328,
          "currency": "eur",
          "image": null,
          "inventory": {
            "quantity": null,
            "type": "infinite",
            "value": null
          },
          "livemode": false,
          "metadata": {},
          "package_dimensions": null,
          "price": 399,
          "product": "increment",
          "updated": 1576267451
        }
      ],
      "has_more": false,
      "total_count": 1,
      "url": "/v1/skus?product=increment&active=true"
    },
    "type": "good",
    "updated": 1553885845,
    "url": null
  }
];

const CONFIG = {
  // Default country for the checkout form.
  country: 'US',

  // Store currency.
  currency: 'eur',

  // Supported payment methods for the store.
  // Some payment methods support only a subset of currencies.
  // Make sure to check the docs: https://stripe.com/docs/sources
  paymentMethods: [
    // 'ach_credit_transfer', // usd (ACH Credit Transfer payments must be in U.S. Dollars)
    'alipay', // aud, cad, eur, gbp, hkd, jpy, nzd, sgd, or usd.
    'bancontact', // eur (Bancontact must always use Euros)
    'card', // many (https://stripe.com/docs/currencies#presentment-currencies)
    'eps', // eur (EPS must always use Euros)
    'ideal', // eur (iDEAL must always use Euros)
    'giropay', // eur (Giropay must always use Euros)
    'multibanco', // eur (Multibanco must always use Euros)
    // 'sepa_debit', // Restricted. See docs for activation details: https://stripe.com/docs/sources/sepa-debit
    'p24', // eur, pln
    'sofort', // eur (SOFORT must always use Euros)
    'wechat', // aud, cad, eur, gbp, hkd, jpy, sgd, or usd.
    'au_becs_debit', //aud
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
