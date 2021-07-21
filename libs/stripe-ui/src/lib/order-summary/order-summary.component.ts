import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from './order-summary.model';

@Component({
  selector: 'valor-launchpad-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  @Input()
  subtotal: number;
  @Input()
  live: boolean;
  @Input()
  orderItems: OrderItem[];
  @Input()
  orderTotal: number;
  constructor() {}

  ngOnInit(): void {}
}
