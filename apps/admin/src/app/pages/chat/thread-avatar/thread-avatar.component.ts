import { Component, Input } from '@angular/core';
import { ChatThreadVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-thread-avatar',
  templateUrl: './thread-avatar.component.html',
  styleUrls: ['./thread-avatar.component.scss'],
})
export class ThreadAvatarComponent {
  @Input() thread: ChatThreadVo;
}
