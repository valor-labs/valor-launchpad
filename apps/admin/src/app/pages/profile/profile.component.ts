import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { DashboardSocialService } from '../dashboard-social/dashboard-social.service';
import { Action, ProfileVo } from '@valor-launchpad/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISocialActivity } from '../dashboard-social/dashboard-social.model';
import { finalize, mergeMap, scan, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'valor-launchpad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: ProfileVo;
  activities$: Observable<ISocialActivity>;
  loadingMore = true;
  actions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#', divider: true },
    { label: 'Separated link', link: '#' },
  ];
  private activityPageLimit = 6;
  private activitiesPaginator$ = new BehaviorSubject({
    lastReadAt: undefined,
    limit: this.activityPageLimit,
  });
  constructor(
    private profileService: ProfileService,
    private socialService: DashboardSocialService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap(({ username }) => this.profileService.getProfile(username))
      )
      .subscribe((data) => {
        this.profile = data;
        window.scrollTo({ top: 0 });
      });
    this.activities$ = this.activitiesPaginator$.pipe(
      mergeMap(({ lastReadAt, limit }) => {
        this.loadingMore = true;
        return this.socialService
          .fetchActivities(lastReadAt, limit)
          .pipe(finalize(() => (this.loadingMore = false)));
      }),
      scan((acc, crt) => ({
        ...crt,
        results: [...acc.results, ...crt.results],
      }))
    );
  }

  loadMoreActivities(lastReadAt: number) {
    this.activitiesPaginator$.next({
      lastReadAt,
      limit: this.activityPageLimit,
    });
  }

  follow(username: string) {
    this.socialService.followUserByUsername(username).subscribe(() => {
      this.profile.following = true;
    });
  }

  unfollow(username: string) {
    this.socialService.unfollowUserByUsername(username).subscribe(() => {
      this.profile.following = false;
    });
  }
}
