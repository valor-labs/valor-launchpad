import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import {
  ChatMessageVo,
  ChatSearchVo,
  ChatThreadVo,
} from '@valor-launchpad/api-interfaces';
import { ChatService } from './chat.service';
import { FormControl } from '@angular/forms';
import { SocketService } from '../../core/socket/socket.service';
import {
  BehaviorSubject,
  concat,
  fromEvent,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs';
import {
  debounceTime,
  filter,
  finalize,
  mapTo,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CreateGroupModalComponent } from './create-group-modal/create-group-modal.component';
import { ProfileService } from '../profile/profile.service';
import { MessageSocketService } from '../../core/message/message-socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notyf, NOTYFToken } from '@valor-launchpad/ui';
import { EditorSlateComponent } from '@valor-launchpad/ui';

interface ChatThreadWithTyping extends ChatThreadVo {
  _isTyping: Subject<boolean>; // triggers when relevant user is typing
  isTyping: Observable<boolean>; // for listening
}

function onSleeping<T, V extends T>(delayMs: number, value: V) {
  return switchMap((source: T) =>
    concat(of(source), timer(delayMs).pipe(mapTo(value as T)))
  );
}

function toTopmost<T>(arr: T[], item: T) {
  arr.splice(arr.indexOf(item), 1);
  arr.unshift(item);
}

@Component({
  selector: 'valor-launchpad-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  onSleeping = onSleeping;
  messengers: ChatThreadWithTyping[] = [];
  messages: ChatMessageVo[] = [];
  messagesLoading = false;
  activeThread: ChatThreadWithTyping;
  activeSingleUserProfile;
  activeThreadNameCtrl = new FormControl(null);
  @ViewChild('searchInput', { static: true })
  searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('chatMsg') chatMsgRef: ElementRef<HTMLElement>;
  @ViewChild('editor', { static: true })
  editor: EditorSlateComponent;
  sendingMessage = false;
  showDetail = false;
  searchOpened = false;
  searching = false;
  searchResult: ChatSearchVo;
  constructor(
    public router: Router,
    private chatService: ChatService,
    private messageSocketService: MessageSocketService,
    private socketService: SocketService,
    private bsModalService: BsModalService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Inject(NOTYFToken) private notyf: Notyf
  ) {}

  ngOnInit(): void {
    this.chatService
      .fetchThreads()
      .pipe(
        switchMap((res) => {
          if (Array.isArray(res) && res.length > 0) {
            this.messengers = res.map((t) => {
              return this.wrapThreadWithTyping(t);
            });
          }
          return this.activatedRoute.queryParams;
        })
      )
      .subscribe(({ threadId }) => {
        if (!this.messengers?.length) {
          return;
        }
        if (!threadId) {
          this.onSelectThread(this.messengers[0].id);
        } else {
          const threadInRoute = this.messengers.find((i) => i.id === threadId);
          if (threadInRoute) {
            this.makeThreadActive(threadInRoute);
          } else {
            this.onSelectThread(this.messengers[0].id);
          }
        }
      });
    this.socketService.listenNewConnection().subscribe((userId) => {
      const hitThread = this.messengers.find(
        (i) => !i.isGroup && i.targetingUser?.id === userId
      );
      if (hitThread) {
        hitThread.isConnected = true;
      }
    });
    this.socketService.listenNewDisconnection().subscribe((userId) => {
      const hitThread = this.messengers.find(
        (i) => !i.isGroup && i.targetingUser?.id === userId
      );
      if (hitThread) {
        hitThread.isConnected = false;
      }
    });
    this.messageSocketService.listenNewMessage().subscribe((message) => {
      if (message.threadId === this.activeThread?.id) {
        this.messages.push(message);
        this.chatZoneToBottom();
      }
      const hitThread = this.messengers.find((i) => i.id === message.threadId);
      if (!hitThread) {
        this.messengers.unshift(this.wrapThreadWithTyping(message.thread));
      } else {
        // add unread count
        if (!message.isSelf) {
          hitThread.unreadMessages.push(message.id);
        }
        toTopmost(this.messengers, hitThread);
      }
    });
    this.chatService.listenTyping().subscribe((val) => {
      const { threadId } = val;
      const hitThread = this.messengers.find((i) => i.id === threadId);
      hitThread?._isTyping.next(true);
    });
    this.editor.schemaChange
      .asObservable()
      .pipe(throttleTime(1000))
      .subscribe(() => {
        this.chatService.sendTypingStatus(this.activeThread.id);
      });

    fromEvent(this.searchInput.nativeElement, 'click').subscribe(() => {
      this.searchOpened = true;
    });
    fromEvent(this.searchInput.nativeElement, 'keydown')
      .pipe(
        tap(() => (this.searching = true)),
        debounceTime(200),
        filter((evt) => {
          const length = (evt.target as HTMLInputElement).value.length;
          if (length === 0) {
            this.searchResult = undefined;
          }
          return length > 0;
        }),
        switchMap((evt) => {
          const { value } = evt.target as HTMLInputElement;
          return this.chatService.search(value);
        }),
        finalize(() => (this.searching = false))
      )
      .subscribe((res) => {
        this.searchResult = res;
      });
  }

  async onSelectThread(threadId: string) {
    await this.router.navigate([], { queryParams: { threadId } });
  }

  private makeThreadActive(thread: ChatThreadWithTyping) {
    if (this.activeThread?.id !== thread.id) {
      this.messages = [];
      this.messagesLoading = true;
    }
    this.activeThread = thread;
    this.chatService
      .fetchThreadMessages(thread.id)
      .pipe(finalize(() => (this.messagesLoading = false)))
      .subscribe((res) => {
        this.messages = res.reverse();
        this.messagesLoading = false;
        this.chatZoneToBottom();
        if (this.activeThread.unreadMessages?.length) {
          this.chatService.markThreadAsRead(thread.id).subscribe(() => {
            this.activeThread.unreadMessages = [];
          });
        }
      });
  }

  onSend(editor: EditorSlateComponent) {
    if (editor.isEmpty) {
      return;
    }
    this.sendingMessage = true;
    this.chatService
      .sendMessage(
        this.activeThread.id,
        editor.schema,
        this.socketService.socketId
      )
      .pipe(finalize(() => (this.sendingMessage = false)))
      .subscribe(
        (res) => {
          editor.clear();
          this.messages.push(res);
          this.chatZoneToBottom();
          toTopmost(this.messengers, this.activeThread);
        },
        (err) => this.notyf.error(err.error.message)
      );
  }

  displayCreateGroupModal() {
    this.chatService.searchUser().subscribe((users) => {
      const inst = this.bsModalService.show(CreateGroupModalComponent, {
        initialState: { users, usage: 'CREATE' },
      });
      inst.content.confirmed
        .asObservable()
        .pipe(
          switchMap((userIds) =>
            this.chatService.createThread('', userIds, true)
          ),
          finalize(() => (inst.content.creating = false))
        )
        .subscribe((newThread) => {
          // put new thead into thread list's head
          const newThreadWithTyping = this.wrapThreadWithTyping(newThread);
          this.messengers.unshift(newThreadWithTyping);
          this.onSelectThread(newThreadWithTyping.id);
          inst.hide();
        });
      inst.content.cancelled.asObservable().subscribe(() => {
        inst.hide();
      });
    });
  }

  displayGroupAddUserModal() {
    this.chatService.searchUser().subscribe((users) => {
      const inst = this.bsModalService.show(CreateGroupModalComponent, {
        initialState: {
          users,
          usage: 'EDIT',
          selectedUsers: [...this.activeThread.chatThreadUsers],
        },
      });
      inst.content.confirmed
        .asObservable()
        .pipe(
          switchMap((userIds) =>
            this.chatService.updateThreadUsers(this.activeThread.id, userIds)
          ),
          finalize(() => (inst.content.creating = false))
        )
        .subscribe((updatedThread) => {
          this.activeThread.chatThreadUsers = updatedThread.chatThreadUsers;
          inst.hide();
        });
      inst.content.cancelled.asObservable().subscribe(() => {
        inst.hide();
      });
    });
  }

  updateGroupProfile() {
    this.chatService
      .updateThreadName(this.activeThread.id, this.activeThreadNameCtrl.value)
      .subscribe(() => {
        this.activeThread.name = this.activeThreadNameCtrl.value;
      });
  }

  showThreadDetail() {
    if (this.activeThread.isGroup) {
      this.activeThreadNameCtrl.setValue(this.activeThread.name);
    } else {
      this.profileService
        .getProfile(this.activeThread.targetingUser.username)
        .subscribe((res) => {
          this.activeSingleUserProfile = res;
        });
    }
    this.showDetail = true;
  }

  chatZoneToBottom() {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.chatMsgRef.nativeElement.scrollTo({
        top: this.chatMsgRef.nativeElement.scrollHeight,
      });
    });
  }

  async onClickSearchResult(mayBeThread: {
    id?: string;
    targetingUser: { id: string };
  }) {
    if (mayBeThread.id) {
      // open thread directly
      this.searchOpened = false;
      await this.onSelectThread(mayBeThread.id);
    } else {
      // create a thread
      this.chatService
        .createThread('', [mayBeThread.targetingUser.id], false)
        .subscribe((newThread) => {
          this.searchOpened = false;
          // put new thead into thread list's head
          const newThreadWithTyping = this.wrapThreadWithTyping(newThread);
          this.messengers.unshift(newThreadWithTyping);
          this.onSelectThread(newThreadWithTyping.id);
        });
    }
  }

  private wrapThreadWithTyping(thread: ChatThreadVo): ChatThreadWithTyping {
    const bs = new BehaviorSubject<boolean>(false);
    return {
      ...thread,
      _isTyping: bs,
      isTyping: bs.pipe(onSleeping(2000, false)),
    };
  }
}
