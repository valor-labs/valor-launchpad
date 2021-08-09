import {Component, Input, OnDestroy, OnInit} from '@angular/core';


const $DropdownList=[];
let $DropdownListIndex=0;

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
  index:number=-1;

  constructor() {
    this.index=$DropdownListIndex;
    $DropdownList.push(this);
    $DropdownListIndex++;
    this.handleClick = this.handleClick.bind(this);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClick);
    $DropdownList.splice(this.index,1);
  }

  toggleDropdown(e) {
    e.stopPropagation();
    this.show = !this.show;
    if(this.show){
      $DropdownList.forEach((instance)=>{
        if(instance.index!==this.index){
          instance.show=false
        }
      })
    }
  }

  handleClick() {
    this.show = false;
  }

  ngOnInit() {
    document.addEventListener('click', this.handleClick);
  }


}
