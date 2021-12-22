import { Component, OnInit } from '@angular/core';
import { BsCustomDates } from 'ngx-bootstrap/datepicker/themes/bs/bs-custom-dates-view.component';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'valor-launchpad-forms-advanced-inputs',
  templateUrl: './forms-advanced-inputs.component.html',
  styleUrls: ['./forms-advanced-inputs.component.scss'],
})
export class FormsAdvancedInputsComponent implements OnInit {
  maskForm: FormGroup;
  countries = [
    { value: 'AK', name: 'Alaska', timezone: 'Alaskan/Hawaiian Time Zone' },
    { value: 'HI', name: 'Hawaii', timezone: 'Alaskan/Hawaiian Time Zone' },
    { value: 'CA', name: 'California', timezone: 'Pacific Time Zone' },
    { value: 'NV', name: 'Nevada', timezone: 'Pacific Time Zone' },
    { value: 'OR', name: 'Oregon', timezone: 'Pacific Time Zone' },
    { value: 'WA', name: 'Washington', timezone: 'Pacific Time Zone' },
    { value: 'AZ', name: 'Arizona', timezone: 'Mountain Time Zone' },
    { value: 'CO', name: 'Colorado', timezone: 'Mountain Time Zone' },
    { value: 'ID', name: 'Idaho', timezone: 'Mountain Time Zone' },
    { value: 'MT', name: 'Montana', timezone: 'Mountain Time Zone' },
    { value: 'NE', name: 'Nebraska', timezone: 'Mountain Time Zone' },
    { value: 'NM', name: 'New Mexico', timezone: 'Mountain Time Zone' },
    { value: 'ND', name: 'North Dakota', timezone: 'Mountain Time Zone' },
    { value: 'UT', name: 'Utah', timezone: 'Mountain Time Zone' },
    { value: 'WY', name: 'Wyoming', timezone: 'Mountain Time Zone' },
    { value: 'AL', name: 'Alabama', timezone: 'Central Time Zone' },
    { value: 'AR', name: 'Arkansas', timezone: 'Central Time Zone' },
    { value: 'IL', name: 'Illinois', timezone: 'Central Time Zone' },
    { value: 'IA', name: 'Iowa', timezone: 'Central Time Zone' },
    { value: 'KS', name: 'Kansas', timezone: 'Central Time Zone' },
    { value: 'KY', name: 'Kentucky', timezone: 'Central Time Zone' },
    { value: 'LA', name: 'Louisiana', timezone: 'Central Time Zone' },
    { value: 'MN', name: 'Minnesota', timezone: 'Central Time Zone' },
    { value: 'MS', name: 'Mississippi', timezone: 'Central Time Zone' },
    { value: 'MO', name: 'Missouri', timezone: 'Central Time Zone' },
    { value: 'OK', name: 'Oklahoma', timezone: 'Central Time Zone' },
    { value: 'SD', name: 'South Dakota', timezone: 'Central Time Zone' },
    { value: 'TX', name: 'Texas', timezone: 'Central Time Zone' },
    { value: 'TN', name: 'Tennessee', timezone: 'Central Time Zone' },
    { value: 'WI', name: 'Wisconsin', timezone: 'Central Time Zone' },
    { value: 'CT', name: 'Connecticut', timezone: 'Eastern Time Zone' },
    { value: 'DE', name: 'Delaware', timezone: 'Eastern Time Zone' },
    { value: 'FL', name: 'Florida', timezone: 'Eastern Time Zone' },
    { value: 'GA', name: 'Georgia', timezone: 'Eastern Time Zone' },
    { value: 'IN', name: 'Indiana', timezone: 'Eastern Time Zone' },
    { value: 'ME', name: 'Maine', timezone: 'Eastern Time Zone' },
    { value: 'MD', name: 'Maryland', timezone: 'Eastern Time Zone' },
    { value: 'MA', name: 'Massachusetts', timezone: 'Eastern Time Zone' },
    { value: 'MI', name: 'Michigan', timezone: 'Eastern Time Zone' },
    { value: 'NH', name: 'New Hampshire', timezone: 'Eastern Time Zone' },
    { value: 'NJ', name: 'New Jersey', timezone: 'Eastern Time Zone' },
    { value: 'NY', name: 'New York', timezone: 'Eastern Time Zone' },
    { value: 'NC', name: 'North Carolina', timezone: 'Eastern Time Zone' },
    { value: 'OH', name: 'Ohio', timezone: 'Eastern Time Zone' },
    { value: 'PA', name: 'Pennsylvania', timezone: 'Eastern Time Zone' },
    { value: 'RI', name: 'Rhode Island', timezone: 'Eastern Time Zone' },
    { value: 'SC', name: 'South Carolina', timezone: 'Eastern Time Zone' },
    { value: 'VT', name: 'Vermont', timezone: 'Eastern Time Zone' },
    { value: 'VA', name: 'Virginia', timezone: 'Eastern Time Zone' },
    { value: 'WV', name: 'West Virginia', timezone: 'Eastern Time Zone' },
  ];
  optionsWithDisabled = [
    { name: 'First', value: 'one' },
    { name: 'Second', value: 'one', disabled: true },
    { name: 'Third', value: 'one' },
  ];
  withTimepickerConfig: Partial<BsDaterangepickerConfig> = {
    withTimepicker: true,
    rangeInputFormat: 'MM/DD/YYYY, h:mm a',
  };
  ranges: BsCustomDates[] = [
    {
      value: [new Date(), new Date()],
      label: 'Today',
    },
    {
      value: [
        new Date(new Date().setDate(new Date().getDate() - 1)),
        new Date(new Date().setDate(new Date().getDate() - 1)),
      ],
      label: 'Yesterday',
    },
    {
      value: [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
      ],
      label: 'Last 7 Days',
    },
    {
      value: [
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date(),
      ],
      label: 'Last 30 Days',
    },
    {
      value: this.getMonthRange(),
      label: 'This month',
    },
    {
      value: this.getLastMonthRange(),
      label: 'Last month',
    },
  ];
  errMessage = 'input format incorrect';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.maskForm = this.fb.group({
      date: [
        null,
        [Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{4}$/)],
      ],
      hour: [null, []],
      dateHour: [null, []],
      zipCode: [null, []],
      crazyZipCode: [null, []],
      money: [null, []],
      money2: [null, []],
      telephone: [null, []],
      telephoneCodeArea: [null, []],
      usTelephone: [null, []],
      spc: [null, []],
      cpf: [null, []],
      cnpj: [null, []],
      ipAdress: [null, []],
    });
  }

  private getMonthRange() {
    const today = new Date();
    return [
      new Date(today.getFullYear(), today.getMonth(), 1),
      new Date(today.getFullYear(), today.getMonth() + 1, 0),
    ];
  }

  private getLastMonthRange() {
    const today = new Date();
    return [
      new Date(today.getFullYear(), today.getMonth() - 1, 1),
      new Date(today.getFullYear(), today.getMonth(), 0),
    ];
  }
}
