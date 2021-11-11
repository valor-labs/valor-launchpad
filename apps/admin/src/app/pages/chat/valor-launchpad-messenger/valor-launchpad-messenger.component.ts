import { Component, Input } from '@angular/core';
import { ChatThreadVo } from '@valor-launchpad/api-interfaces';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'valor-launchpad-valor-launchpad-messenger',
  templateUrl: './valor-launchpad-messenger.component.html',
  styleUrls: ['./valor-launchpad-messenger.component.scss'],
})
export class ValorLaunchpadMessengerComponent {
  @Input() messenger: ChatThreadVo;
  @Input() active: boolean;
  constructor(private authService: AuthService) {}

  isSelf(userId: string) {
    return this.authService.user.value.id === userId;
  }
}
