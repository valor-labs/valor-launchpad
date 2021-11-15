import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ChatMessageVo, ChatThreadVo } from '@valor-launchpad/api-interfaces';
import { ChatService } from './chat.service';
import { NgModel } from '@angular/forms';
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
import { finalize, mapTo, switchMap, throttleTime } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CreateGroupModalComponent } from './create-group-modal/create-group-modal.component';

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
  @ViewChild('chatMsg') chatMsgRef: ElementRef<HTMLElement>;
  @ViewChild('messageInput', { static: true })
  messageInput: ElementRef<HTMLInputElement>;
  sendingMessage = false;
  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private bsModalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initMessengers();
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
    this.chatService.listenNewMessage().subscribe((message) => {
      if (message.threadId === this.activeThread.id) {
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
    fromEvent(this.messageInput.nativeElement, 'keydown')
      .pipe(throttleTime(1000))
      .subscribe((res) => {
        this.chatService.sendTypingStatus(this.activeThread.id);
      });
  }

  onSelectThread(thread: ChatThreadWithTyping) {
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

  onSend(msgModel: NgModel) {
    if (!msgModel.value) {
      return;
    }
    this.sendingMessage = true;
    this.chatService
      .sendMessage(
        this.activeThread.id,
        msgModel.value,
        this.socketService.socketId
      )
      .pipe(finalize(() => (this.sendingMessage = false)))
      .subscribe((res) => {
        msgModel.reset();
        this.messages.push(res);
        this.chatZoneToBottom();
        toTopmost(this.messengers, this.activeThread);
      });
  }

  displayCreateGroupModal() {
    const inst = this.bsModalService.show(CreateGroupModalComponent);
    inst.content.succeed.asObservable().subscribe((newThread) => {
      // put new thead into thread list's head
      const newThreadWithTyping = this.wrapThreadWithTyping(newThread);
      this.messengers.unshift(newThreadWithTyping);
      this.onSelectThread(newThreadWithTyping);
      inst.hide();
    });
    inst.content.cancelled.asObservable().subscribe(() => {
      inst.hide();
    });
  }

  private initMessengers(): void {
    this.chatService.fetchThreads().subscribe((res) => {
      if (Array.isArray(res) && res.length > 0) {
        this.messengers = res.map((t) => {
          return this.wrapThreadWithTyping(t);
        });
        this.onSelectThread(this.messengers[0]);
      }
    });
  }

  private chatZoneToBottom() {
    this.cdr.detectChanges();
    this.chatMsgRef.nativeElement.scrollTo({
      top: this.chatMsgRef.nativeElement.scrollHeight,
    });
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
