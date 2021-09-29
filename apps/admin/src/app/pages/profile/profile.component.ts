import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";
import {DashboardSocialService} from "../dashboard-social/dashboard-social.service";
import {Action} from "@valor-launchpad/api-interfaces";
import { BehaviorSubject, Observable } from 'rxjs';
import { ISocialActivity } from '../dashboard-social/dashboard-social.model';
import { mergeMap, scan } from 'rxjs/operators';

@Component({
  selector: 'valor-launchpad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;
  activities$: Observable<ISocialActivity>;
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
    private socialService: DashboardSocialService
  ) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.profile = data;
    });
    this.activities$ = this.activitiesPaginator$.pipe(
      mergeMap(({ lastReadAt, limit }) =>
        this.socialService.fetchActivities(lastReadAt, limit)
      ),
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
}
