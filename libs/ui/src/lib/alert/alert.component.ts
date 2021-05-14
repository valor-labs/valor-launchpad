import {Component, Input, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
