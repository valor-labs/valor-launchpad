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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TableColumn } from '@swimlane/ngx-datatable';
import { UserListLine } from '@valor-launchpad/api-interfaces';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'valor-launchpad-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss'],
})
export class UsersListingComponent implements OnInit {
  userForm!: FormGroup;
  addTagFC = new FormControl([]);
  keywordControl = new FormControl('');
  columns: TableColumn[] = [];
  roleFilter = new Set<string>(); // role id array
  tagFilter = new Set<string>(); // tag id array
  usersRefreshController$ = new BehaviorSubject(true);
  users$ = this.usersRefreshController$.asObservable().pipe(
    tap(() => (this.selectedRows = [])),
    switchMap(() => {
      return this.usersListingService.getUsers(
        Array.from(this.roleFilter),
        Array.from(this.tagFilter),
        this.keywordControl.value
      );
    })
  );
  selectedRows: UserListLine[] = [];
  addEditVisible = false;
  mode: 'add' | 'edit' | undefined;
  allRoleOptions: { name: string; value: string }[] = [];
  allTagOptions: { name: string; id: string }[] = [];

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @ViewChild('emailCell', { static: true })
  private emailCell?: TemplateRef<UserListLine>;
  @ViewChild('phoneCell', { static: true })
  private phoneCell?: TemplateRef<UserListLine>;
  @ViewChild('rolesCell', { static: true })
  private rolesCell?: TemplateRef<UserListLine>;
  @ViewChild('tagsCell', { static: true })
  private tagsCell?: TemplateRef<UserListLine>;
  @ViewChild('historyCell', { static: true })
  private historyCell?: TemplateRef<UserListLine>;
  @ViewChild('actionsCell', { static: true })
  private actionsCell?: TemplateRef<UserListLine>;

  @ViewChild('rolesHeader', { static: true })
  private rolesHeader?: TemplateRef<void>;
  @ViewChild('tagsHeader', { static: true })
  private tagsHeader?: TemplateRef<void>;

  //TODO verify this after https://github.com/valor-software/valor-launchpad/issues/175 lands
  // @HostListener('document:keydown.escape', ['$event'])
  // handleKeydown() {
  //   this.addEditVisible = false;
  // }
  rowClass = (row: UserListLine) => ({
    active: this.selectedRows.find((sr) => sr.id === row.id),
  });

  get allSelectedDeleted() {
    return this.selectedRows.every((i) => i.deletedDate !== null);
  }

  get allSelectedActive() {
    return this.selectedRows.every((i) => i.deletedDate === null);
  }

  constructor(
    private usersListingService: UsersListingService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private bsModalService: BsModalService,
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

  openEdit(event: MouseEvent, user: UserListLine) {
    event.stopPropagation();
    this.mode = 'edit';
    this.fetchRoles();
    this.fetchTags();
    this.userForm = this.fb.group({
      id: [user.id],
      username: [user.username, [Validators.required]],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      roles: [
        user.userRoles.map((r) => ({
          name: r.rolesEntity.role,
          value: r.role_id,
        })),
        [Validators.required],
      ],
      tags: [
        user.userTags.map((r) => ({ name: r.tagsEntity.name, id: r.tag_id })),
      ],
    });
    this.addEditVisible = true;
  }

  addTags(modal: ModalDirective) {
    this.usersListingService
      .batchAddTags(
        this.selectedRows.map((i) => i.id),
        this.addTagFC.value
      )
      .subscribe(() => {
        this.selectedRows = [];
        this.addTagFC.reset();
        modal.hide();
        this.fetchUsers();
      });
  }

  openAddTagModal(modal: ModalDirective) {
    this.addTagFC.reset();
    modal.show();
  }

  cancelAddTags(modal: ModalDirective) {
    this.addTagFC.reset();
    modal.hide();
  }

  onSelect(row: { selected: UserListLine[] }) {
    this.selectedRows = row.selected;
  }

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchTags();
    const commonDef: Partial<TableColumn> = {
      cellClass: 'd-flex align-items-center p-2',
      headerClass: 'p-2',
      resizeable: false,
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
        name: 'Phone',
        cellTemplate: this.phoneCell,
        flexGrow: 2,
        ...commonDef,
      },
      {
        name: 'Roles',
        cellTemplate: this.rolesCell,
        flexGrow: 1,
        sortable: false,
        minWidth: 100,
        ...commonDef,
        headerTemplate: this.rolesHeader,
      },
      {
        name: 'Tags',
        cellTemplate: this.tagsCell,
        flexGrow: 1,
        sortable: false,
        ...commonDef,
        minWidth: 100,
        headerTemplate: this.tagsHeader,
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
    this.keywordControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        this.fetchUsers();
      });
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
      this.allTagOptions = data.map((i) => ({
        name: i.name,
        id: i.id,
      }));
    });
  }

  resetAllFilters() {
    this.roleFilter = new Set();
    this.tagFilter = new Set();
    this.keywordControl.setValue('', { emitEvent: false });
    this.fetchUsers();
  }

  private fetchUsers() {
    this.usersRefreshController$.next(true);
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

  delete(event: MouseEvent, username: string) {
    event.stopPropagation();
    this.usersListingService.deleteUser(username).subscribe((data) => {
      this.fetchUsers();
    });
  }

  batchDelete() {
    const userIds = this.selectedRows.map((i) => i.id);
    if (userIds.length > 0) {
      this.usersListingService.batchDeleteUser(userIds).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  restore(event: MouseEvent, username: string) {
    event.stopPropagation();
    this.usersListingService.restoreUser(username).subscribe((data) => {
      this.fetchUsers();
    });
  }

  batchRestore() {
    const userIds = this.selectedRows.map((i) => i.id);
    if (userIds.length > 0) {
      this.usersListingService.batchRestoreUser(userIds).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  resetPassword(event: MouseEvent, username: string) {
    event.stopPropagation();
    this.usersListingService.resetPassword(username).subscribe((data) => {
      this.fetchUsers();
    });
  }

  resendEmail(event: MouseEvent, id: string) {
    event.stopPropagation();
    this.usersListingService.resendEmail(id).subscribe((data) => {
      this.fetchUsers();
    });
  }

  onFilterRole(roleId: string) {
    if (this.roleFilter.has(roleId)) {
      this.roleFilter.delete(roleId);
    } else {
      this.roleFilter.add(roleId);
    }
    this.fetchUsers();
  }

  onFilterTag(tagId: string) {
    if (this.tagFilter.has(tagId)) {
      this.tagFilter.delete(tagId);
    } else {
      this.tagFilter.add(tagId);
    }
    this.fetchUsers();
  }
}
