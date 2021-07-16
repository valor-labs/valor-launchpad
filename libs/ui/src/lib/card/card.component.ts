import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  padding: string;

  @Input()
  noBoarding = false;

  @Input()
  noHeader = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
