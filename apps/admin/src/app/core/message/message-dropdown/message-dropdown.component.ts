import { Component, OnInit } from '@angular/core';
import { MessageSocketService } from '../message-socket.service';
import { ChatMessageVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-message-dropdown',
  templateUrl: './message-dropdown.component.html',
  styleUrls: ['./message-dropdown.component.scss'],
})
export class MessageDropdownComponent implements OnInit {
  messages: ChatMessageVo[] = [];
  constructor(private messageSocketService: MessageSocketService) {}

  ngOnInit(): void {
    this.messageSocketService
      .fetchUnreadMessages()
      .subscribe((res) => (this.messages = res));
    this.messageSocketService.listenNewMessage().subscribe((newMessage) => {
      this.messages.unshift(newMessage);
    });
  }
}
