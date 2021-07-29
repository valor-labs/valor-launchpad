import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MegaMenuColumn } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-dropdown-mega-menu',
  templateUrl: './dropdown-mega-menu.component.html',
  styleUrls: ['./dropdown-mega-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMegaMenuComponent{
  @Input() 
  public columns: MegaMenuColumn[];
}
