import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormControl, Validators } from '@angular/forms';
import { ChatUserVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss'],
})
export class CreateGroupModalComponent implements OnInit {
  @Input() users: ChatUserVo[];
  @Input() usage: 'CREATE' | 'EDIT';
  @Output() confirmed = new EventEmitter<string[]>();
  @Output() cancelled = new EventEmitter();
  userOptions: ChatUserVo[] = [];
  selectedUsers: ChatUserVo[] = [];
  keywordSearchControl = new FormControl();
  groupNameControl = new FormControl('', [Validators.required]);
  creating = false;

  ngOnInit(): void {
    this.userOptions = this.users;
    this.keywordSearchControl.valueChanges.subscribe((keyword) => {
      this.userOptions = this.users.filter(
        (u) =>
          u.firstName.includes(keyword) ||
          u.lastName.includes(keyword) ||
          u.username.includes(keyword)
      );
    });
  }

  toggleSelectUser(user) {
    const index = this.selectedIndex(user);
    if (index === -1) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  selectedIndex(user) {
    return this.selectedUsers.findIndex((u) => u.id === user.id);
  }

  onCreateGroup() {
    this.creating = true;
    this.confirmed.emit(this.selectedUsers.map((i) => i.id));
  }
}
