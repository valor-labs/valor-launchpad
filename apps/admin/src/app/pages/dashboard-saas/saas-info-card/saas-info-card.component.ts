import { Component, Input } from '@angular/core';

@Component({
  selector: 'valor-launchpad-saas-info-card',
  templateUrl: './saas-info-card.component.html',
  styleUrls: ['./saas-info-card.component.scss'],
})
export class SaasInfoCardComponent {
  @Input() icon: string;
  @Input() mainTitle: string;
  @Input() value: string;
  @Input() change: number;
}
