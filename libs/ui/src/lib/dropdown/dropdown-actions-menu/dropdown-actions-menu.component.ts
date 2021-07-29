import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-dropdown-actions-menu',
  templateUrl: './dropdown-actions-menu.component.html',
  styleUrls: ['./dropdown-actions-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownActionsMenuComponent {
  @Input()
  public data: Action[];
}
