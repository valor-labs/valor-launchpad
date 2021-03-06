import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'valor-launchpad-percent-badge',
  templateUrl: './percent-badge.component.html',
  styleUrls: ['./percent-badge.component.scss'],
})
export class PercentBadgeComponent implements OnChanges {
  @HostBinding('class.badge') private basic = true;
  @Input() val: number;
  @Input() precision: number;

  formattedVal = '';

  @HostBinding('class.badge-soft-success') private get isSuccess() {
    return this.val >= 0;
  }

  @HostBinding('class.badge-soft-danger') private get isDanger() {
    return this.val < 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.val || changes.precision) {
      this.fmtVal();
    }
  }

  private fmtVal() {
    const prefix = this.val >= 0 ? '+' : '';
    this.formattedVal = `${prefix}${(this.val * 100).toFixed(this.precision)}%`;
  }
}
