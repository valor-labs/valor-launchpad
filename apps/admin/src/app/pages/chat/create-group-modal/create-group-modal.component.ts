import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { ChatThreadVo, ChatUserVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss'],
})
export class CreateGroupModalComponent implements OnInit {
  @Output() succeed = new EventEmitter<ChatThreadVo>();
  @Output() cancelled = new EventEmitter();
  users$: Observable<ChatUserVo[]>;
  selectedUsers: ChatUserVo[] = [];
  keywordSearchControl = new FormControl();
  groupNameControl = new FormControl('', [Validators.required]);
  creating = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.users$ = this.keywordSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((keyword: string) => this.chatService.searchUser(keyword))
    );
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
    if (this.groupNameControl.invalid || this.selectedUsers.length === 0) {
      this.groupNameControl.markAllAsTouched();
      return;
    }
    this.creating = true;
    this.chatService
      .createThread(
        this.groupNameControl.value,
        this.selectedUsers.map((i) => i.id),
        true
      )
      .pipe(finalize(() => (this.creating = false)))
      .subscribe((res) => {
        this.succeed.emit(res);
      });
  }
}
