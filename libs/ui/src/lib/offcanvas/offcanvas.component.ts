import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'valor-launchpad-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.css']
})
export class OffcanvasComponent implements OnInit {

  @Input()
  show:boolean=false;

  @Input()
  title:string="Offcanvas";

  @Input()
  position:"start"|"end"|"bottom"="start"

  @Input()
  scrolling:boolean=false;

  @Input()
  backdrop:boolean=true;

  @Output()
  onClose=new EventEmitter();

  handleClose(){
    this.onClose.emit();
    document.body.setAttribute('class','');
    document.body.setAttribute('style','');
  }

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes',changes);
     if(changes.show.currentValue){
       if(this.backdrop){
          document.body.setAttribute('class','offcanvas-backdrop');
       }else{
          document.body.setAttribute('class','');
       }
       if(this.scrolling){
          document.body.setAttribute('style','overflow: auto;');
       }else{
          document.body.setAttribute('style','overflow: hidden; padding-right: 0px;');
       }  
     }
    
  }

}
