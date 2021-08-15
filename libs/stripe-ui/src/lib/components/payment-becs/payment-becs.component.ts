import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StripeAuBankAccountElement, StripeElements } from '@stripe/stripe-js';
import { customStyle } from '../../constants/custom-style';

@Component({
  selector: 'valor-launchpad-payment-becs',
  templateUrl: './payment-becs.component.html',
  styleUrls: ['../styles/payment-way.scss', './payment-becs.component.scss'],
  exportAs: 'paymentBecs',
})
export class PaymentBecsComponent implements OnInit, OnDestroy {
  @Input() elements: StripeElements;
  @ViewChild('becs', { static: true }) private becsEl: ElementRef<HTMLElement>;
  becs: StripeAuBankAccountElement;

  ngOnInit(): void {
    this.becs = this.elements.create('auBankAccount', { style: customStyle });
    this.becs.mount(this.becsEl.nativeElement);
  }

  ngOnDestroy() {
    this.becs.destroy();
  }
}
