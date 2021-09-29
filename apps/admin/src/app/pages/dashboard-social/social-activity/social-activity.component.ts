import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ISocialActivityItem } from '../dashboard-social.model';

@Component({
  selector: 'valor-launchpad-social-activity',
  templateUrl: './social-activity.component.html',
  styleUrls: ['./social-activity.component.scss'],
})
export class SocialActivityComponent implements OnInit {
  @HostBinding('class.d-flex')
  @HostBinding('class.align-items-start')
  private basicClass = true;

  @Input() activity: ISocialActivityItem;
  constructor() {}

  ngOnInit(): void {}
}
