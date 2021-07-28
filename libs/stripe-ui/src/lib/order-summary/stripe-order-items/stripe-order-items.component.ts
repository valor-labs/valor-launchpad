import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-stripe-order-items',
  templateUrl: './stripe-order-items.component.html',
  styleUrls: ['./stripe-order-items.component.scss'],
})
export class StripeOrderItemsComponent implements OnInit {
  @HostBinding('class.stripe-order') private basicClass = true;

  constructor() {}

  ngOnInit(): void {}
}
