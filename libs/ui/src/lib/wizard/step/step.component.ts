import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { VLWizardTheme } from '../wizard.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[valor-launchpad-step]',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent {
  @HostBinding('class.nav-item') h = true;
  @Input() theme: VLWizardTheme;
  @Input() mainTitle: string;
  @Input() description: string;
  @Input() status: 'inactive' | 'active' | 'done';
}
