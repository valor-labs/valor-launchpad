import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import QRCode from 'qrcodejs2';

@Component({
  selector: 'valor-launchpad-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnChanges, OnInit {
  @ViewChild('qrcode', { static: true }) qrcodeEl: ElementRef<HTMLElement>;
  @Input() text: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    new QRCode(this.qrcodeEl.nativeElement, {
      text: this.text,
      width: 128,
      height: 128,
      colorDark: '#424770',
      colorLight: '#f8fbfd',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  ngOnInit(): void {}
}
