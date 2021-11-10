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
import {
  delay,
  finalize,
  mapTo,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs/operators';

interface ChatThreadWithTyping extends ChatThreadVo {
  _isTyping: Subject<boolean>;
  isTyping: Observable<boolean>;
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
  activeThread: ChatThreadWithTyping;
  @ViewChild('chatMsg') chatMsgRef: ElementRef<HTMLElement>;
  @ViewChild('messageInput', { static: true })
  messageInput: ElementRef<HTMLInputElement>;
  sendingMessage = false;
  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
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
      // add unread count
      if (!message.isSelf) {
        hitThread.unreadMessages.push(message.id);
      }
      toTopmost(this.messengers, hitThread);
    });
    this.chatService.listenTyping().subscribe((val) => {
      const { threadId } = val;
      const hitThread = this.messengers.find((i) => i.id === threadId);
      hitThread._isTyping.next(true);
    });
    fromEvent(this.messageInput.nativeElement, 'keydown')
      .pipe(throttleTime(1000))
      .subscribe((res) => {
        this.chatService.sendTypingStatus(this.activeThread.id);
      });
  }

  onSelectThread(thread: ChatThreadWithTyping) {
    this.activeThread = thread;
    this.chatService.fetchThreadMessages(thread.id).subscribe((res) => {
      this.messages = res.reverse();
      this.chatZoneToBottom();
      this.chatService.markThreadAsRead(thread.id).subscribe(() => {
        this.activeThread.unreadMessages = [];
      });
    });
  }

  onSend(msgModel: NgModel) {
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

  private initMessengers(): void {
    this.chatService.fetchThreads().subscribe((res) => {
      this.messengers = res.map((t) => {
        const bs = new BehaviorSubject<boolean>(false);
        return {
          ...t,
          _isTyping: bs,
          isTyping: bs.pipe(onSleeping(2000, false)),
        };
      });
      this.onSelectThread(this.messengers[0]);
    });
  }

  private chatZoneToBottom() {
    this.cdr.detectChanges();
    this.chatMsgRef.nativeElement.scrollTo({
      top: this.chatMsgRef.nativeElement.scrollHeight,
    });
  }
}
