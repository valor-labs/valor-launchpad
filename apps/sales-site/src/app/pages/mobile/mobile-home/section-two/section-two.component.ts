import { Component, OnInit, Input } from '@angular/core';
import { themeType } from '../../../../core/theme/theme.service';


@Component({
  selector: 'valor-launchpad-section-two',
  templateUrl: './section-two.component.html',
  styleUrls: ['./section-two.component.scss']
})
export class SectionTwoComponent {
  @Input() theme: themeType;
}
