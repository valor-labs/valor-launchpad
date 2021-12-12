import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '@valor-launchpad/ui';
import { Validators } from '@angular/forms';
import { OrderItem } from '../order-summary/order-summary.model';
import { StripeUiService } from '../stripe-ui.service';
import { DynamicFormComponent } from '@valor-launchpad/ui';
import { localUrlFactory } from '../utils';
import { paymentStatusRoute } from '../constants';
import { RequestingUser } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-direct-pay',
  templateUrl: './direct-pay.component.html',
  styleUrls: ['./direct-pay.component.scss'],
})
export class DirectPayComponent implements OnInit {
  billingFormConfig: FieldConfig[];

  orderItems: OrderItem[] = [
    {
      id: 'coffee',
      name: 'BattleCreek Coffee',
      sku: {
        attributes: {},
      },
      quantity: 2,
      skuPrice: '$12',
      unitAmount: 1200,
      lineItemPrice: '$24.00',
      lineItemRawPrice: '$24.00' as unknown as number,
    },
  ];

  subtotal = '$24.00';
  shipping = '$90.00';
  orderTotal = '$114.00';
  currentUser: RequestingUser;

  private returnURL: string;

  constructor(private stripeUiService: StripeUiService) {
    this.returnURL = localUrlFactory(paymentStatusRoute);
  }

  ngOnInit(): void {
    this.stripeUiService.getAllCountries().subscribe((allCountries) => {
      this.billingFormConfig = [
        {
          label: 'Name',
          name: 'name',
          type: 'input',
          subtype: 'text',
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
        },
        {
          label: 'Email',
          name: 'email',
          type: 'input',
          subtype: 'text',
          validation: [Validators.required, Validators.email],
          errorMessage: (errors) =>
            errors.email
              ? 'Please input correct email'
              : 'The field is required',
        },
        {
          label: 'City',
          name: 'city',
          type: 'input',
          subtype: 'text',
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
        },
        {
          label: 'Zip code',
          name: 'zip',
          type: 'input',
          subtype: 'text',
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
        },
        {
          label: 'Address',
          name: 'address',
          type: 'input',
          subtype: 'text',
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
        },
        {
          label: 'State',
          name: 'state',
          type: 'input',
          subtype: 'text',
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
        },
        {
          label: 'Country',
          name: 'country',
          type: 'select',
          subtype: 'select',
          options: allCountries,
          validation: [Validators.required],
          errorMessage: () => 'The field is required',
        },
        {
          label: 'Shipping address is same as billing',
          name: 'isSameAddress',
          type: 'input',
          subtype: 'checkbox',
        },
      ];
    });
  }

  submit(form: DynamicFormComponent) {
    this.stripeUiService
      .createCheckoutSession({
        successUrl: this.returnURL + '?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: location.href,
        items: this.orderItems.map((i) => ({
          productName: i.name,
          unitAmount: i.unitAmount,
          currency: 'usd',
          quantity: i.quantity,
        })),
      })
      .subscribe(({ url }) => {
        window.location.href = url;
      });
  }

  generate(form: DynamicFormComponent) {
    this.stripeUiService.getCurrentUserInfo().subscribe((
      user: Partial<RequestingUser>
    ) => {
      const { firstName, lastName, email, profile } = user;
      const { from, city, address, zip, locale } = profile;

      form.form.patchValue({
        name: `${firstName} ${lastName}`,
        email: email,
        address: address,
        city: city,
        state: from,
        zip: zip,
        country: locale
      })
    })
  }
}
