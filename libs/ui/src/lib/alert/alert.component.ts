import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'valor-launchpad-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() icon;

  @Input() outline = false;

  @Input() colored = false;

  @Input() type = 'warning';

  @Input() dismissible = false;

  @Input() isOpen = true;

  @Output() 
  public close =  new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
  }

  onClosed() {
    this.close.emit(false);
  }
}
