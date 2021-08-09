import {Component, Input, OnDestroy, OnInit} from '@angular/core';


const $DropdownCollection:Record<number,any>={};
let $DropdownCollectionKey:number=0;

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
    console.log('dropdown collection',$DropdownCollection)
    this.index=$DropdownCollectionKey;
    $DropdownCollection[this.index]=this;
    $DropdownCollectionKey++;
    this.handleClick = this.handleClick.bind(this);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClick);
    delete $DropdownCollection[this.index]
  }

  toggleDropdown(e) {
    e.stopPropagation();
    this.show = !this.show;
    if(this.show){
      Object.keys($DropdownCollection).forEach(key=>{
        if(this.index!==parseInt(key)){
          $DropdownCollection[key].show=false;
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
