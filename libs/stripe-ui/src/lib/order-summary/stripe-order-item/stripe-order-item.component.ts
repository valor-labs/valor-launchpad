import { Component, HostBinding, Input } from '@angular/core';
import { OrderItem } from '../order-summary.model';

@Component({
  selector: 'valor-launchpad-stripe-order-item',
  templateUrl: './stripe-order-item.component.html',
  styleUrls: ['./stripe-order-item.component.scss'],
})
export class StripeOrderItemComponent {
  @HostBinding('class.stripe-order-item') private basicClass = true;
  @Input() orderItem: OrderItem;
}
