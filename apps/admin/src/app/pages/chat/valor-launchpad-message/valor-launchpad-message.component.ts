import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';


export interface ValorLaunchpadMessage {
  name: string | 'You',
  content: string,
  time: string,
  avatar?: string
}

@Component({
  selector: 'valor-launchpad-valor-launchpad-message',
  templateUrl: './valor-launchpad-message.component.html',
  styleUrls: ['./valor-launchpad-message.component.scss']
})
export class ValorLaunchpadMessageComponent implements OnInit {

  chatMessageClass: { [key: string]: boolean };
  chatMarginClass: { [key: string]: boolean };

  constructor(
  ) {
  }

  @Input() message: ValorLaunchpadMessage;

  ngOnInit(): void {
    this.chatMessageClass = {
      'chat-message-right': this.message.name === 'You',
      'chat-message-left': this.message.name !== 'You'
    };
    this.chatMarginClass = {
      'me-3': this.message.name === 'You',
      'ms-3': this.message.name !== 'You'
    };
  }

}
