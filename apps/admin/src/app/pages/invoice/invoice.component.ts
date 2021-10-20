import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'valor-launchpad-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoiceDetail$ = this.invoiceService.getInvoice();

  constructor(
    @Inject(DOCUMENT) private _doc: Document,
    private renderer: Renderer2,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {}

  onPrint() {
    window.print();
  }

  @HostListener('window:beforeprint')
  onBeforePrint() {
    const els = this.queryCommonEl();
    els.forEach((el) => this.renderer.addClass(el, 'd-print-none'));
  }

  @HostListener('window:afterprint')
  onAfterPrint() {
    const els = this.queryCommonEl();
    els.forEach((el) => this.renderer.removeClass(el, 'd-print-none'));
  }

  private queryCommonEl() {
    return [
      this._doc.querySelector('valor-launchpad-navigation'),
      this._doc.querySelector('valor-launchpad-header'),
      this._doc.querySelector('valor-launchpad-footer'),
    ];
  }
}
