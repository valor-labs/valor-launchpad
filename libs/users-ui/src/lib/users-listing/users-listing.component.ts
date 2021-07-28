import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsersListingService} from './users-listing.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'valor-launchpad-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {
  users: any;
  addEditVisible = false;
  rolesInputVisible = false;
  rolesInputValue = '';
  defaultRole: Array<any> = [];
  availableRoles = [];
  roles: Array<any> = ['User'];//todo: pull these from db

  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

  //TODO verify this after https://github.com/valor-software/valor-launchpad/issues/175 lands
  // @HostListener('document:keydown.escape', ['$event'])
  // handleKeydown() {
  //   this.addEditVisible = false;
  // }

  constructor(private usersListingService: UsersListingService) {
  }

  handleClose(removedTag: string): void {
    this.roles = this.roles.filter(roles => roles !== removedTag);
  }

  showRolesInput(): void {
    this.rolesInputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    debugger
    const selectedRole = this.availableRoles.find((role: any) => {
      debugger
      if (role.role === this.rolesInputValue) {
        return role;
      }
    })
    if (this.roles.indexOf(selectedRole) === -1) {
      this.roles = [...this.roles, selectedRole];
    }
    this.rolesInputValue = '';
    this.rolesInputVisible = false;
  }

  addEditCloseEvent() {
    this.addEditVisible = false;
    this.roles = this.defaultRole;
  }

  openAddEdit(user?) {
    this.addEditVisible = true;
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchRoles();
  }

  fetchRoles() {
    this.usersListingService.getAvailableRoles().subscribe((data: any) => {
      this.availableRoles = data;
      this.defaultRole = [this.availableRoles.find((role: any) => {
        if (role.role === 'User') {
          return role;
        }
      })]
      this.roles = this.defaultRole
    })
  }

  fetchUsers() {
    this.usersListingService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser(createUserForm: NgForm) {
    delete createUserForm.value.rolesInputValue;
    debugger
    this.usersListingService.addUser(createUserForm.value).subscribe(() => {
      debugger
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

  resetPassword(username: string) {
    this.usersListingService.resetPassword(username).subscribe(data => {
      this.fetchUsers();
    })
  }

  resendEmail(id: string) {
    this.usersListingService.resendEmail(id).subscribe(data => {
      this.fetchUsers();
    })
  }
}
