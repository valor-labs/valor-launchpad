import { Component, OnInit } from '@angular/core';
import {
  ISocialActivity,
  ISocialUserInfo,
  IStory,
} from './dashboard-social.model';
import { DashboardSocialService } from './dashboard-social.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserFollower } from '@valor-launchpad/api-interfaces';
import { mergeMap, scan } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'valor-launchpad-dashboard-social',
  templateUrl: './dashboard-social.component.html',
  styleUrls: ['./dashboard-social.component.scss'],
})
export class DashboardSocialComponent implements OnInit {
  stories$: Observable<IStory[]>;
  followings$: Observable<UserFollower[]>;
  activities$: Observable<ISocialActivity>;
  private activityPageLimit = 6;
  private activitiesPaginator$ = new BehaviorSubject({
    lastReadAt: undefined,
    limit: this.activityPageLimit,
  });

  constructor(
    private dashboardSocialService: DashboardSocialService,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.stories$ = this.dashboardSocialService.fetchTimeline();
    this.followings$ = this.dashboardSocialService.fetchFollowings();
    this.activities$ = this.activitiesPaginator$.pipe(
      mergeMap(({ lastReadAt, limit }) =>
        this.dashboardSocialService.fetchActivities(lastReadAt, limit)
      ),
      scan((acc, crt) => ({
        ...crt,
        results: [...acc.results, ...crt.results],
      }))
    );
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

  followUser(user: UserFollower) {
    this.dashboardSocialService
      .followUser(user.id)
      .subscribe(() => (user.followed = true));
  }

  unfollowUser(user: UserFollower) {
    this.dashboardSocialService
      .unfollowUser(user.id)
      .subscribe(() => (user.followed = false));
  }

  loadMoreActivities(lastReadAt: number) {
    this.activitiesPaginator$.next({
      lastReadAt,
      limit: this.activityPageLimit,
    });
  }
}
