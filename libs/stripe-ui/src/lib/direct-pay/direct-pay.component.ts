import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '@valor-launchpad/ui';
import { Validators } from '@angular/forms';
import { OrderItem } from '../order-summary/order-summary.model';
import { StripeUiService } from '../stripe-ui.service';
import { DynamicFormComponent } from '@valor-launchpad/ui';

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
      quantity: '2',
      skuPrice: '$12' as unknown as number,
      lineItemPrice: '$24.00' as unknown as number,
      lineItemRawPrice: '$24.00' as unknown as number,
    },
  ];

  subtotal = '$24.00';
  shipping = '$90.00';
  orderTotal = '$114.00';

  constructor(private stripeUiService: StripeUiService) {}

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
    if (form.invalid) {
      this.stripeUiService.loopFormGroup(form.form);
      return;
    }
  }
}
