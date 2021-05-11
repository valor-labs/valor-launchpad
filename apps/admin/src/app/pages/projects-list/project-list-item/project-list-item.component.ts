import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {
  @HostBinding('class')
  class = "col-12 col-md-6 col-lg-3";

  @Input()
  config;

  constructor() {
  }

  ngOnInit(): void {
  }

  fireAction(type:string){
    //todo: make this meaningful
    console.log(`action fired for card: ` + type)
  }
}
