import { Component } from '@angular/core';
import { BarValue } from 'ngx-bootstrap/progressbar/progressbar-type.interface';

@Component({
  selector: 'valor-launchpad-ui-general',
  templateUrl: './ui-general.component.html',
  styleUrls: ['./ui-general.component.scss'],
})
export class UiGeneralComponent {
  multiProgressbarVal: Partial<BarValue>[] = [
    { value: 30, label: 'Stacked' },
    { value: 15, type: 'warning', label: '15%' },
    { value: 30, type: 'success', label: '30%' },
    { value: 20, type: 'danger', label: '20%' },
  ];
}
