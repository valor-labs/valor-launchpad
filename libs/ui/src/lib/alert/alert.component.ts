import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'valor-launchpad-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() icon;

  @Input() outline = false;

  @Input() colored = false;

  @Input() type = 'warning';

  @Input() dismissible = false;

  @Input() isOpen = true;

  @Output()
  public close =  new EventEmitter()

  onClosed() {
    this.close.emit(false);
  }
}
