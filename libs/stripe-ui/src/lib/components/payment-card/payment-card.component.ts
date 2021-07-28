import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { customStyle } from '../../custom-style';

@Component({
  selector: 'valor-launchpad-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['../styles/payment-way.scss'],
  exportAs: 'paymentCard',
})
export class PaymentCardComponent implements OnInit, OnDestroy {
  @Input() elements: StripeElements;
  @ViewChild('card', { static: true }) cardEl: ElementRef<HTMLElement>;

  card: StripeCardElement;

  ngOnInit(): void {
    this.card = this.elements.create('card', { style: customStyle });
    this.card.mount(this.cardEl.nativeElement);
  }

  ngOnDestroy() {
    this.card.destroy();
  }
}
