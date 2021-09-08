import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'valor-launchpad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService
              ) {

  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.profile = data;
    })
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
