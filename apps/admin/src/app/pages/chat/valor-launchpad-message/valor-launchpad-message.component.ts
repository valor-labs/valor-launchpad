import { Component, Input } from '@angular/core';
import { ChatMessageVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-valor-launchpad-message',
  templateUrl: './valor-launchpad-message.component.html',
  styleUrls: ['./valor-launchpad-message.component.scss'],
})
export class ValorLaunchpadMessageComponent {
  @Input() message: ChatMessageVo;
}
