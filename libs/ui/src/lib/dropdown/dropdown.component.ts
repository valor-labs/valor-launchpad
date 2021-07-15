import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';



@Component({
  selector: 'valor-launchpad-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit,OnDestroy {
  @Input()
  direction:string;

  @Input()
  actions:Action[];

  @Input()
  classes:string;

  show: boolean = false;

  constructor(){
    this.handleClick=this.handleClick.bind(this);
  }

  ngOnDestroy(){
     document.removeEventListener('click',this.handleClick);
  }


  toggleDropdown(e) {
    e.stopPropagation();
    this.show = !this.show;
  }

  handleClick(){
    this.show=false;
  }

  ngOnInit() {
    document.addEventListener('click', this.handleClick);
  }



 
}
