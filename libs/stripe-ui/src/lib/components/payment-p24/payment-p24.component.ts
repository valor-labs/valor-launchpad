import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StripeElements, StripeP24BankElement } from '@stripe/stripe-js';
import { customStyle } from '../../constants/custom-style';

@Component({
  selector: 'valor-launchpad-payment-p24',
  templateUrl: './payment-p24.component.html',
  styleUrls: ['../styles/payment-way.scss', './payment-p24.component.scss'],
  exportAs: 'paymentP24',
})
export class PaymentP24Component implements OnInit, OnDestroy {
  @Input() elements: StripeElements;
  p24: StripeP24BankElement;
  @ViewChild('p24', { static: true }) p24El: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.p24 = this.elements.create('p24Bank', {
      style: {
        base: Object.assign({ padding: '10px 15px' }, customStyle.base),
      },
    });
    this.p24.mount(this.p24El.nativeElement);
  }

  ngOnDestroy() {
    this.p24.destroy();
  }
}
