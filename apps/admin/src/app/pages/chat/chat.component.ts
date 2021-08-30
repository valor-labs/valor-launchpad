import { Component, OnInit } from '@angular/core';
import { ValorLaunchpadMessenger } from './valor-launchpad-messenger/valor-launchpad-messenger.component';
import { ValorLaunchpadMessage } from './valor-launchpad-message/valor-launchpad-message.component';

@Component({
  selector: 'valor-launchpad-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messengers: ValorLaunchpadMessenger[] = [];
  messages: ValorLaunchpadMessage[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.initMessengers();
    this.initMessages();
  }

  private initMessengers(): void {
    this.messengers = [
      {
        name: 'Ashley Briggs',
        status: 'Online',
        unreadNumber: 5
      },
      {
        name: 'Carl Jenkins',
        status: 'Online',
        unreadNumber: 2
      },
      {
        name: 'Bertha Martin',
        status: 'Online',
        unreadNumber: 0
      },
      {
        name: 'Stacie Hall',
        status: 'Offline',
        unreadNumber: 0
      },
      {
        name: 'Fiona Green',
        status: 'Offline',
        unreadNumber: 0
      },
      {
        name: 'Doris Wilder',
        status: 'Offline',
        unreadNumber: 0
      },
      {
        name: 'Haley Kennedy',
        status: 'Offline',
        unreadNumber: 0
      },
      {
        name: 'Jennifer Chang',
        status: 'Offline',
        unreadNumber: 0
      }
    ];
  }

  private initMessages(): void {
    this.messages = [
      {
        name: 'You',
        content: 'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
        time: '2:33 am'
      },
      {
        name: 'Bertha Martin',
        content: 'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
        time: '2:34 am'
      },
      {
        name: 'You',
        content: 'Cum ea graeci tractatos.',
        time: '2:35 am'
      },
      {
        name: 'Bertha Martin',
        content: '              Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et\n' +
          '                        velit. Proin ultricies placerat imperdiet. Morbi varius\n' +
          '                        quam ac venenatis tempus.',
        time: '2:36 am'
      },
      {
        name: 'Bertha Martin',
        content: 'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
        time: '2:38 am'
      },
      {
        name: 'Bertha Martin',
        content: 'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
        time: '2:39 am'
      },
      {
        name: 'You',
        content: 'Cum ea graeci tractatos.',
        time: '2:40 am'
      },
      {
        name: 'You',
        content: 'Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id dignissim metus urna eget purus.',
        time: '2:41 am'
      },
      {
        name: 'Bertha Martin',
        content: '                Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et\n' +
          '                        velit. Proin ultricies placerat imperdiet. Morbi varius\n' +
          '                        quam ac venenatis tempus.',
        time: '2:42 am'
      },
      {
        name: 'You',
        content: 'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
        time: '2:43 am'
      },
      {
        name: 'Bertha Martin',
        content: 'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
        time: '2:44 am'
      }
    ];
  }

}
