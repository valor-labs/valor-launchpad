import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'valor-launchpad-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @Input()
  subtotal
  @Input()
  live
  @Input()
  orderItems
  @Input()
  orderTotal
  constructor() { }

  ngOnInit(): void {
  }

}
