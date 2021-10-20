import { Component } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-ui-buttons',
  templateUrl: './ui-buttons.component.html',
  styleUrls: ['./ui-buttons.component.scss'],
})
export class UiButtonsComponent {
  buttonActions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another Action', link: '#' },
    { label: 'Something else here', link: '#' },
    { label: 'divider', divider: true },
    { label: 'Seperated link', link: '#' },
  ];

  constructor() {}
}
