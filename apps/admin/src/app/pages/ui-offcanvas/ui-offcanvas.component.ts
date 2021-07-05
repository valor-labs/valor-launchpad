import { Component, OnInit } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-ui-offcanvas',
  templateUrl: './ui-offcanvas.component.html',
  styleUrls: ['./ui-offcanvas.component.scss']
})
export class UiOffCanvasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dropdownActions:Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  showExample:boolean=false;
  showLeft:boolean=false;
  showRight:boolean=false;
  showBottom:boolean=false;
  showScrolling:boolean=false;
  showBackdrop:boolean=false;
  showScrollingBackdrop:boolean=false;

  toggleShowExample(){
    this.showExample=!this.showExample
  }
  toggleShowLeft(){
    this.showLeft=!this.showLeft;
  }
  toggleShowRight(){
    this.showRight=!this.showRight;
  }
  toggleShowBottom(){
    this.showBottom=!this.showBottom;
  }
  toggleShowScrolling(){
    this.showScrolling=!this.showScrolling;
  }
  toggleShowBackdrop(){
    this.showBackdrop=!this.showBackdrop;
  }
  toggleShowScrollingBackdrop(){
    this.showScrollingBackdrop=!this.showScrollingBackdrop;
  }

  handleCloseExample(){
    this.showExample=false;
  }

  handleCloseLeft(){
    this.showLeft=false;
  }

  handleCloseRight(){
    this.showRight=false;
  }
  handleCloseBottom(){
    this.showBottom=false;
  }

  handleCloseScrolling(){
    this.showScrolling=false;
  }
  handleCloseBackdrop(){
    this.showBackdrop=false;
  }
  handleCloseScrollingBackdrop(){
    this.showScrollingBackdrop=false;
  }


}
