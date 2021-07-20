import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @HostBinding('class.card') private card = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
