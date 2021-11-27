import { Component, Input } from '@angular/core';
import { ChatThreadVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-valor-launchpad-messenger',
  templateUrl: './valor-launchpad-messenger.component.html',
  styleUrls: ['./valor-launchpad-messenger.component.scss'],
})
export class ValorLaunchpadMessengerComponent {
  @Input() messenger: ChatThreadVo;
  @Input() active: boolean;

  get genGroupName() {
    return this.messenger.chatThreadUsers
      .map((i) => `${i.firstName} ${i.lastName}`)
      .join(', ');
  }
}
