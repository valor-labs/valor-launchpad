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

@Component({
  selector: 'valor-launchpad-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messengers: ChatThreadVo[] = [];
  messages: ChatMessageVo[] = [];
  activeThread: ChatThreadVo;
  @ViewChild('chatMsg') chatMsgRef: ElementRef<HTMLElement>;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initMessengers();
    this.socketService.listenNewConnection().subscribe((userId) => {
      const hitThread = this.messengers.find(
        (i) => i.targetingUser.id === userId
      );
      if (hitThread) {
        hitThread.isConnected = true;
      }
    });
    this.socketService.listenNewDisconnection().subscribe((userId) => {
      const hitThread = this.messengers.find(
        (i) => i.targetingUser.id === userId
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
      // add unread count
      if (!message.isSelf) {
        this.messengers
          .find((i) => i.id === message.threadId)
          .unreadMessages.push(message.id);
      }
    });
  }

  onSelectThread(thread: ChatThreadVo) {
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
    this.chatService
      .sendMessage(
        this.activeThread.id,
        msgModel.value,
        this.socketService.socketId
      )
      .subscribe((res) => {
        msgModel.reset();
        this.messages.push(res);
        this.chatZoneToBottom();
      });
  }

  private initMessengers(): void {
    this.chatService.fetchThreads().subscribe((res) => {
      this.messengers = res;
      this.onSelectThread(res[0]);
    });
  }

  private chatZoneToBottom() {
    this.cdr.detectChanges();
    this.chatMsgRef.nativeElement.scrollTo({
      top: this.chatMsgRef.nativeElement.scrollHeight,
    });
  }
}
