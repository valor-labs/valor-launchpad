import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-stripe-order-total',
  templateUrl: './stripe-order-total.component.html',
  styleUrls: ['./stripe-order-total.component.scss'],
})
export class StripeOrderTotalComponent {
  @Input() subtotal;
  @Input() live;
  @Input() orderTotal;
  @Input() shipping;
}
