import {
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { UsersListingService } from './users-listing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from '@swimlane/ngx-datatable';
import { UserListLine } from '@valor-launchpad/api-interfaces';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'valor-launchpad-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss'],
})
export class UsersListingComponent implements OnInit {
  userForm!: FormGroup;

  columns: TableColumn[] = [];
  users: UserListLine[] = [];
  addEditVisible = false;
  mode: 'add' | 'edit' | undefined;
  allRoleOptions: { name: string; value: string }[] = [];
  allTagOptions: { name: string; id: string }[] = [];

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @ViewChild('emailCell', { static: true })
  private emailCell?: TemplateRef<UserListLine>;
  @ViewChild('rolesCell', { static: true })
  private rolesCell?: TemplateRef<UserListLine>;
  @ViewChild('tagsCell', { static: true })
  private tagsCell?: TemplateRef<UserListLine>;
  @ViewChild('historyCell', { static: true })
  private historyCell?: TemplateRef<UserListLine>;
  @ViewChild('actionsCell', { static: true })
  private actionsCell?: TemplateRef<UserListLine>;

  //TODO verify this after https://github.com/valor-software/valor-launchpad/issues/175 lands
  // @HostListener('document:keydown.escape', ['$event'])
  // handleKeydown() {
  //   this.addEditVisible = false;
  // }

  constructor(
    private usersListingService: UsersListingService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    @Inject(LOCALE_ID) private localeId: string
  ) {}

  addEditCloseEvent() {
    this.addEditVisible = false;
  }

  openAdd() {
    this.mode = 'add';
    this.fetchRoles();
    this.fetchTags();
    this.userForm = this.fb.group({
      username: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      roles: [[], [Validators.required]],
      tags: [[]],
    });
    this.addEditVisible = true;
  }

  openEdit(user: UserListLine) {
    this.mode = 'edit';
    this.fetchRoles();
    this.fetchTags();
    this.userForm = this.fb.group({
      id: [user.id],
      username: [user.username, [Validators.required]],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      roles: [user.userRoles.map(r => ({ name: r.rolesEntity.role, value: r.role_id })), [Validators.required]],
      tags: [user.userTags.map(r => ({ name: r.tagsEntity.name, id: r.tag_id }))],
    });
    this.addEditVisible = true;
  }

  ngOnInit(): void {
    const commonDef: Partial<TableColumn> = {
      cellClass: 'd-flex align-items-center p-2',
      headerClass: 'p-2',
    };
    this.columns = [
      { name: 'First', prop: 'firstName', flexGrow: 1, ...commonDef },
      { name: 'Last', prop: 'lastName', flexGrow: 1, ...commonDef },
      { name: 'Username', prop: 'username', flexGrow: 1, ...commonDef },
      {
        name: 'Email',
        cellTemplate: this.emailCell,
        flexGrow: 2,
        ...commonDef,
      },
      {
        name: 'Roles',
        cellTemplate: this.rolesCell,
        flexGrow: 1,
        sortable: false,
        ...commonDef,
      },
      {
        name: 'Tags',
        cellTemplate: this.tagsCell,
        flexGrow: 1,
        sortable: false,
        ...commonDef,
      },
      {
        name: 'Last Log In',
        prop: 'lastLogin',
        pipe: {
          transform: (value) =>
            new DatePipe(this.localeId).transform(value, 'short'),
        },
        flexGrow: 2,
        ...commonDef,
      },
      {
        name: 'History',
        prop: 'userHistory',
        cellTemplate: this.historyCell,
        flexGrow: 3,
        sortable: false,
        ...commonDef,
      },
      {
        name: 'Actions',
        cellTemplate: this.actionsCell,
        flexGrow: 2,
        sortable: false,
        ...commonDef,
      },
    ];
    this.fetchUsers();
  }

  fetchRoles() {
    this.usersListingService.getAvailableRoles().subscribe((data: any) => {
      this.allRoleOptions = data.map((i: any) => ({
        name: i.role,
        value: i.id,
      }));
    });
  }

  fetchTags() {
    this.usersListingService.getTags().subscribe((data) => {
      this.allTagOptions = data.map(i => ({
        name: i.name,
        id: i.id,
      }));
    });
  }

  fetchUsers() {
    this.usersListingService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.usersListingService.addUser(this.userForm.value).subscribe(
      () => {
        this.userForm.reset();
        this.fetchUsers();
        this.addEditVisible = false;
        this.toastrService.success('User created successfully');
      },
      (err) => {
        this.toastrService.error(err.error.message);
      }
    );
  }

  editUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.usersListingService.editUser(this.userForm.value).subscribe(
      () => {
        this.userForm.reset();
        this.fetchUsers();
        this.addEditVisible = false;
        this.toastrService.success('User edited successfully');
      },
      (err) => {
        this.toastrService.error(err.error.message);
      }
    );
  }

  delete(username: string) {
    this.usersListingService.deleteUser(username).subscribe((data) => {
      this.fetchUsers();
    });
  }

  restore(username: string) {
    this.usersListingService.restoreUser(username).subscribe((data) => {
      this.fetchUsers();
    });
  }

  resetPassword(username: string) {
    this.usersListingService.resetPassword(username).subscribe((data) => {
      this.fetchUsers();
    });
  }

  resendEmail(id: string) {
    this.usersListingService.resendEmail(id).subscribe((data) => {
      this.fetchUsers();
    });
  }
}
