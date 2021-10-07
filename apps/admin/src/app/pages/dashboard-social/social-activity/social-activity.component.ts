import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ISocialActivityItem } from '../dashboard-social.model';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navProfile(username: string) {
    this.router.navigate(['profile'], { queryParams: { username } });
  }
}
