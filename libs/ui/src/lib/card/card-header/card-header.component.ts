import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {
  @HostBinding('class.card-header') private header = true;
  constructor() { }

  ngOnInit(): void {
  }

}
