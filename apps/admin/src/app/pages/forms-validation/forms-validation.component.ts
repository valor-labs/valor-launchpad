import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const passwordShouldEqual: ValidatorFn = (formGroup) => {
  const pwd = formGroup.get('password').value;
  const confirmedPwd = formGroup.get('passwordConfirm').value;
  if (!confirmedPwd) {
    formGroup.get('passwordConfirm').setErrors({ required: true });
  } else if (pwd !== confirmedPwd) {
    formGroup.get('passwordConfirm').setErrors({ notEqual: true });
  } else {
    formGroup.get('passwordConfirm').setErrors(null);
  }
  return null;
};

const requiredCheckedCount =
  (count: number): ValidatorFn =>
  (formControl) => {
    const value = formControl.value;
    if (Array.isArray(value) && value.length >= count) {
      return null;
    }
    return { checkAtLeast: count };
  };

@Component({
  selector: 'valor-launchpad-forms-validation',
  templateUrl: './forms-validation.component.html',
  styleUrls: ['./forms-validation.component.scss'],
})
export class FormsValidationComponent implements OnInit {
  validateForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  gears = [
    { name: 'Pitons', category: 'Climbing', child: { state: 'Active' } },
    { name: 'Cams', category: 'Climbing', child: { state: 'Active' } },
    { name: 'Nuts', category: 'Climbing', child: { state: 'Active' } },
    { name: 'Bolts', category: 'Climbing', child: { state: 'Active' } },
    { name: 'Stoppers', category: 'Climbing', child: { state: 'Active' } },
    { name: 'Sling', category: 'Climbing', child: { state: 'Active' } },
    { name: 'Skis', category: 'Skiing', child: { state: 'Active' } },
    { name: 'Skis', category: 'Skiing', child: { state: 'Active' } },
    { name: 'Skins', category: 'Skiing', child: { state: 'Active' } },
    { name: 'Poles', category: 'Skiing', child: { state: 'Active' } },
  ];

  checkboxGroupOptions = [
    { label: 'One', value: 'One' },
    { label: 'Two', value: 'Two' },
  ];

  isDirtyAndInvalid(key: string): boolean {
    const control = this.validateForm.get(key);
    return (control.dirty || control.touched) && control.invalid;
  }

  ngOnInit(): void {
    const urlPattern =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    this.validateForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        passwordConfirm: [null, [Validators.required]],
        requiredField: [null, [Validators.required]],
        url: [null, [Validators.required, Validators.pattern(urlPattern)]],
        nativeSelect: [null, [Validators.required]],
        nativeMultiSelect: [null, [Validators.required]],
        uiSelect: [null, [Validators.required]],
        uiMultiSelect: [null, [Validators.required]],
        longText: [null, [Validators.required]],
        file: [null, [Validators.required]],
        validationRadios: [null, [Validators.required]],
        validationCheckbox: [null, [Validators.requiredTrue]],
        validationCheckboxGroup: [['One'], [requiredCheckedCount(1)]],
      },
      { validators: [passwordShouldEqual] }
    );
  }

  submit() {
    console.log(this.validateForm.value);
    for (const c of Object.values(this.validateForm.controls)) {
      c.markAsDirty();
      c.updateValueAndValidity();
    }
  }
}
