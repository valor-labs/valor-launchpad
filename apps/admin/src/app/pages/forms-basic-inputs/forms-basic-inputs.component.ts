import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VLCheckBoxOption } from '@valor-launchpad/ui';

@Component({
  selector: 'valor-launchpad-forms-basic-inputs',
  templateUrl: './forms-basic-inputs.component.html',
  styleUrls: ['./forms-basic-inputs.component.scss']
})
export class FormsBasicInputsComponent implements OnInit {
  verticalCheckboxOptions: VLCheckBoxOption[] = [
    {
      label: `Option one is this and that—be sure to include why it's great`,
      value: `Option one is this and that—be sure to include why it's great`,
    },
    {
      label: `Option two is disabled`,
      value: `Option two is disabled`,
      disabled: true,
    },
  ];
  horizontalCheckboxOptions: VLCheckBoxOption[] = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3', disabled: true },
  ];
  selectOptions = [
    { label: 'Open this select menu', value: 'Open this select menu' },
    { label: 'One', value: 'One' },
    { label: 'Two', value: 'Two' },
    { label: 'Three', value: 'Three' },
  ];

  // Input
  inputControl = new FormControl();
  textareaControl = new FormControl();

  // Checkboxes
  vCheckboxControl = new FormControl();
  hCheckboxControl = new FormControl();

  // Sizes
  largeInput = new FormControl();
  mediumInput = new FormControl();
  smallInput = new FormControl();

  // Radios
  radioGroup = new FormControl();
  hRadioGroup = new FormControl();

  // Switches
  switch1 = new FormControl();
  switch2 = new FormControl(true);
  switch3 = new FormControl();
  switch4 = new FormControl(true);

  // Selects
  select = new FormControl('Open this select menu');
  multiSelect = new FormControl();

  // Disabled
  disabledInput = new FormControl({value: null, disabled: true});
  disabledSelect = new FormControl({value: 'Disabled select', disabled: true});
  disabledCheckbox = new FormControl({value: null, disabled: true});

  // Read only
  readonlyInput = new FormControl();

  ngOnInit(): void {
    this.multiSelect.valueChanges.subscribe(console.log)
  }

}
