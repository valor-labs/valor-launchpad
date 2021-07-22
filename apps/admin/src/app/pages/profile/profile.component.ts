import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";

@Component({
  selector: 'valor-launchpad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      debugger
      this.profile = data;
    })
  }

}
