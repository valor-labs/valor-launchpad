import { Component, HostBinding, Input } from '@angular/core';
import { ISocialActivityItem } from '../dashboard-social.model';
import { Router } from '@angular/router';

@Component({
  selector: 'valor-launchpad-social-activity',
  templateUrl: './social-activity.component.html',
  styleUrls: ['./social-activity.component.scss'],
})
export class SocialActivityComponent {
  @HostBinding('class.d-flex')
  @HostBinding('class.align-items-start')
  private basicClass = true;

  @Input() activity: ISocialActivityItem;
  constructor(private router: Router) {}

  navProfile(username: string) {
    this.router.navigate(['profile'], { queryParams: { username } });
  }
}
