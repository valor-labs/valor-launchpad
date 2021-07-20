import {Component, OnInit} from '@angular/core';
import {UsersListingService} from './users-listing.service';
import {NgForm} from '@angular/forms';

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

  addUser(createUserForm:NgForm) {
    this.usersListingService.addUser(createUserForm.value).subscribe(result=>{
      createUserForm.resetForm();
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

  resetPassword(username:string){
    this.usersListingService.resetPassword(username).subscribe(data => {
      this.fetchUsers();
    })
  }

  resendEmail(id:string){
    this.usersListingService.resendEmail(id).subscribe(data => {
      this.fetchUsers();
    })
  }
}
