import { Component, Input, OnInit } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';



@Component({
  selector: 'valor-launchpad-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input()
  direction:string;

  @Input()
  actions:Action[];

  @Input()
  classes:string;

  show: boolean = false;
  toggleDropdown(e) {
    e.stopPropagation();
    this.show = !this.show;
  }

  ngOnInit() {
    document.addEventListener('click', () => {
      this.show = false;
    })
  }

 
}
