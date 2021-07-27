import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StripeElements, StripeEpsBankElement } from '@stripe/stripe-js';
import { customStyle } from '../../custom-style';

@Component({
  selector: 'valor-launchpad-payment-eps',
  templateUrl: './payment-eps.component.html',
  styleUrls: ['../styles/payment-way.scss', './payment-eps.component.scss'],
  exportAs: 'paymentEps',
})
export class PaymentEpsComponent implements OnInit, OnDestroy {
  @Input() elements: StripeElements;
  @ViewChild('eps', { static: true }) elsEl: ElementRef<HTMLElement>;

  eps: StripeEpsBankElement;

  ngOnInit(): void {
    this.eps = this.elements.create('epsBank', {
      style: {
        base: Object.assign({ padding: '10px 15px' }, customStyle.base),
      },
    });
    this.eps.mount(this.elsEl.nativeElement);
  }

  ngOnDestroy() {
    this.eps.destroy();
  }
}
