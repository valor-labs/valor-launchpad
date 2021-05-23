import { Component, Input } from '@angular/core';
import { Timeline } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input()
  classes

  @Input()
  timeline
}
