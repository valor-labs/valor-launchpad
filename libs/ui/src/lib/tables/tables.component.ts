import { Component, Input, OnInit} from '@angular/core';
import {TableColumns} from '@valor-launchpad/api-interfaces';
@Component({
  selector: 'valor-launchpad-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  @Input()
  class

  @Input()
  style

  @Input()
  columns:TableColumns

  @Input()
  data

  keys:string[]=[];

  ngOnInit(): void {
   this.columns.forEach((item)=>{ this.keys.push(item.key)})
  }

  
 

}
