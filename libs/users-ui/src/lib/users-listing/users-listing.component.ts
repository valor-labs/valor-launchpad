import {Component, OnInit} from '@angular/core';
import {UsersListingService} from './users-listing.service';

@Component({
  selector: 'valor-launchpad-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  users: any;

  constructor(private usersListingService: UsersListingService) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersListingService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser(createUserForm:any) {
    this.usersListingService.addUser(createUserForm.value).subscribe(result=>{
      this.fetchUsers();
    })
  }

  edit(user) {
    //TODO: Tie this to the form
  }

  delete(username: string) {
    this.usersListingService.deleteUser(username).subscribe(data => {
      this.fetchUsers();
    })
  }

  restore(username: string) {
    this.usersListingService.restoreUser(username).subscribe(data => {
      this.fetchUsers();
    })
  }
}
