import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";
import {DashboardSocialService} from "../dashboard-social/dashboard-social.service";
import {Action} from "@valor-launchpad/api-interfaces";

@Component({
  selector: 'valor-launchpad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;
  activities = [];
  actions: Action[] = [
    { label: 'Action', link: '#' },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#', divider: true },
    { label: 'Separated link', link: '#' },
  ];

  constructor(
    private profileService: ProfileService,
    private socialService: DashboardSocialService
  ) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.profile = data;
    });
    // static data in fe now
    // todo: move it to database
    this.socialService.fetchActivities().subscribe(res => this.activities = res);
  }

}
