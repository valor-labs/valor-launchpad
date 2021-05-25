import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-forms-wizard',
  templateUrl: './forms-wizard.component.html',
  styleUrls: ['./forms-wizard.component.scss']
})
export class FormsWizardComponent {
  index = 1;
  steps = [
    {mainTitle: 'First step', description: 'Step description'},
    {mainTitle: 'Second step', description: 'Step description'},
    {mainTitle: 'Third step', description: 'Step description'},
    {mainTitle: 'Forth step', description: 'Step description'},
  ];
}
