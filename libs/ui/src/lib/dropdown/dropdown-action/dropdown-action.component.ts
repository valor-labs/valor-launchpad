import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-dropdown-action',
  templateUrl: './dropdown-action.component.html',
  styleUrls: ['./dropdown-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownActionComponent implements OnInit {

  @Input()
  public action: Action;

  constructor() { }

  ngOnInit(): void {
  }

}
