import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input()
  direction: string = 'end';

  @Input()
  classes: string;

  @Input()
  size:''|'lg'=''

  show = false;

  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClick);
  }

  toggleDropdown(e) {
    e.stopPropagation();
    this.show = !this.show;
  }

  handleClick() {
    this.show = false;
  }

  ngOnInit() {
    document.addEventListener('click', this.handleClick);
  }


}
