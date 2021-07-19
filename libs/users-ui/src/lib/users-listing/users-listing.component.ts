import {Component, OnInit} from '@angular/core';
import {UsersListingService} from './users-listing.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'valor-launchpad-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  users: any;
  userFormGroup: FormGroup;

  constructor(private usersListingService: UsersListingService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      firstName: [],
      lastName: [],
      username: [],
      userRoles: [],
      userTags: [],
    });
    this.usersListingService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  edit(user){
    //TODO: Tie this to the form
  }
}
