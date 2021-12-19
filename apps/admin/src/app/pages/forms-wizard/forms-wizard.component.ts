import { Component } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'valor-launchpad-forms-wizard',
  templateUrl: './forms-wizard.component.html',
  styleUrls: ['./forms-wizard.component.scss'],
})
export class FormsWizardComponent {
  primaryWizardIndex = 1;
  primaryWizardSteps = [
    { mainTitle: 'First step', description: 'Step description' },
    { mainTitle: 'Second step', description: 'Step description' },
    { mainTitle: 'Third step', description: 'Step description' },
    { mainTitle: 'Forth step', description: 'Step description' },
  ];

  dangerWizardIndex = 1;
  dangerWizardSteps = [
    { mainTitle: 'First step', description: 'Step description' },
    { mainTitle: 'Second step', description: 'Step description' },
    { mainTitle: 'Third step', description: 'Step description' },
    { mainTitle: 'Forth step', description: 'Step description' },
  ];

  successWizardIndex = 1;
  successWizardSteps = [
    { mainTitle: 'First step', description: 'Step description' },
    { mainTitle: 'Second step', description: 'Step description' },
    { mainTitle: 'Third step', description: 'Step description' },
    { mainTitle: 'Forth step', description: 'Step description' },
  ];

  primaryArrowWizardIndex = 1;
  primaryArrowWizardSteps = [
    { mainTitle: 'First step', description: 'Step description' },
    { mainTitle: 'Second step', description: 'Step description' },
    { mainTitle: 'Third step', description: 'Step description' },
    { mainTitle: 'Forth step', description: 'Step description' },
  ];

  dangerArrowWizardIndex = 1;
  dangerArrowWizardSteps = [
    { mainTitle: 'First step', description: 'Step description' },
    { mainTitle: 'Second step', description: 'Step description' },
    { mainTitle: 'Third step', description: 'Step description' },
    { mainTitle: 'Forth step', description: 'Step description' },
  ];

  successArrowWizardIndex = 1;
  successArrowWizardSteps = [
    { mainTitle: 'First step', description: 'Step description' },
    { mainTitle: 'Second step', description: 'Step description' },
    { mainTitle: 'Third step', description: 'Step description' },
    { mainTitle: 'Forth step', description: 'Step description' },
  ];

  formIndex = 1;
  formSteps = [
    { mainTitle: 'First step', description: 'Step description' },
    { mainTitle: 'Second step', description: 'Step description' },
    { mainTitle: 'Third step', description: 'Step description' },
  ];

  firstStepForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    confirmedPassword: [null, [Validators.required, this.validatePassWordEqual('password', 'confirmedPassword')]],
  });

  secondStepForm = this.fb.group({
    firstname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    address: [null],
  });

  dotsWizardIndex = 1;
  dotsWizardSteps = [
    { mainTitle: 'First step', description: 'Step description' },
    { mainTitle: 'Second step', description: 'Step description' },
    { mainTitle: 'Third step', description: 'Step description' },
    { mainTitle: 'Forth step', description: 'Step description' },
  ];

  thirdStepForm = this.fb.group({
    agreed: [false, [Validators.requiredTrue]],
  });

  confirmedTip = 'This field is required.'

  onBeforeNext = () => {
    const forms = [this.firstStepForm, this.secondStepForm];
    const currentForm = forms[this.formIndex];
    const invalid = currentForm.invalid;
    if (invalid) {
      for (const c of Object.values(currentForm.controls)) {
        c.markAsDirty();
        c.updateValueAndValidity();
      }
    }
    return !invalid;
  };
  constructor(private fb: FormBuilder) {}

  validatePassWordEqual(passwordKey: string, confirmedPasswordKey: string): ValidatorFn {
    return (): {[key: string]: any} => {
      if (this.firstStepForm) {
        const password = this.firstStepForm.controls[passwordKey];
        const confirmedPassword = this.firstStepForm.controls[confirmedPasswordKey];

        password.valueChanges.subscribe(() => {
          confirmedPassword.updateValueAndValidity()
        })

        confirmedPassword.valueChanges.subscribe(value => {
          if (value) {
            this.confirmedTip = 'Passwords are not equal.'
          } else {
            this.confirmedTip = 'This field is required.'
          }
        })
  
        return password.value === confirmedPassword.value ? null : { validatePassWordEqual: true }
      }

      return null
    }
  }

}
