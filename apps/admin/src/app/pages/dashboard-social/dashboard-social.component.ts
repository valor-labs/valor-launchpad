import { Component, OnInit } from '@angular/core';
import { ISocialActivity, ISocialUser, ISocialUserInfo, IStory } from './dashboard-social.model';
import { DashboardSocialService } from './dashboard-social.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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


  constructor(
    private dashboardSocialService: DashboardSocialService,
    private toastr: ToastrService
              ) { }

  ngOnInit(): void {
    this.stories$ = this.dashboardSocialService.fetchTimeline();
    this.userinfo$ = this.dashboardSocialService.fetchUserInfo();
    this.followings$ = this.dashboardSocialService.fetchFollowings();
    this.activities$ = this.dashboardSocialService.fetchActivities();
  }

  onClickAction(): void {
    this.toastr.success('Action!', 'You Click the Action!');
  }

  onClickAnotherAction(): void {
    alert('You Click the Another Action!');
  }

  onClickSomethingElse(): void {
    console.log('You click the something else');
  }



}
