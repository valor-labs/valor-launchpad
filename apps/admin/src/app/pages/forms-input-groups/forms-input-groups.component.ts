import { Component } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-forms-input-groups',
  templateUrl: './forms-input-groups.component.html',
  styleUrls: ['./forms-input-groups.component.scss'],
})
export class FormsInputGroupsComponent {
  actions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#', divider: true },
    { label: 'Separated link', link: '#' },
  ];
}
