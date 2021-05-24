import { Component, Input } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';



@Component({
  selector: 'valor-launchpad-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input()
  direction

  @Input()
  actions:Action[]

  @Input()
  show

 
}
