import { Component, OnInit } from '@angular/core';
import { ISocialActivity, ISocialUser, ISocialUserInfo, IStory } from './dashboard-social.model';
import { DashboardSocialService } from './dashboard-social.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'valor-launchpad-dashboard-social',
  templateUrl: './dashboard-social.component.html',
  styleUrls: ['./dashboard-social.component.scss']
})
export class DashboardSocialComponent implements OnInit {

  stories$: Observable<IStory[]>;

  userinfo$: Observable<ISocialUserInfo>;

  followings$: Observable<ISocialUser[]>;

  activities$: Observable<ISocialActivity[]>;


  constructor(private dashboardSocialService: DashboardSocialService) { }

  ngOnInit(): void {
    this.stories$ = this.dashboardSocialService.fetchTimeline();
    this.userinfo$ = this.dashboardSocialService.fetchUserInfo();
    this.followings$ = this.dashboardSocialService.fetchFollowings();
    this.activities$ = this.dashboardSocialService.fetchActivities();
  }

}
