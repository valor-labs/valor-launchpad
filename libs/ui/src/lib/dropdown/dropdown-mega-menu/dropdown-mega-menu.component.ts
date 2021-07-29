import {  Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'valor-launchpad-dropdown-mega-menu',
  templateUrl: './dropdown-mega-menu.component.html',
  styleUrls: ['./dropdown-mega-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMegaMenuComponent{
  @Input() 
  public data: any[];
}
