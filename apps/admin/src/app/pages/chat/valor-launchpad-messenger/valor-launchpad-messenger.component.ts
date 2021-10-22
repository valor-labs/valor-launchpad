import { Component, Input, OnInit } from '@angular/core';

export interface ValorLaunchpadMessenger {
  name: string;
  status: 'Online' | 'Offline';
  unreadNumber: number;
  avatarUrl?: string;
}

@Component({
  selector: 'valor-launchpad-valor-launchpad-messenger',
  templateUrl: './valor-launchpad-messenger.component.html',
  styleUrls: ['./valor-launchpad-messenger.component.scss'],
})
export class ValorLaunchpadMessengerComponent implements OnInit {
  unreadStatusClass: { [key: string]: boolean };

  messengerStatusClass: { [key: string]: boolean };

  @Input() messenger: ValorLaunchpadMessenger = {
    name: '',
    status: 'Online',
    unreadNumber: 0,
  };

  ngOnInit(): void {
    this.unreadStatusClass = {
      'bg-success': this._isOnline,
      'bg-failure': this._isOffline,
    };

    this.messengerStatusClass = {
      'chat-online': this._isOnline,
      'chat-offline': this._isOffline,
    };
    this.messenger.avatarUrl = this.genRandomAvatar();
  }

  private get _isOnline(): boolean {
    return this.messenger.status === 'Online';
  }

  private get _isOffline(): boolean {
    return this.messenger.status === 'Offline';
  }

  genRandomAvatar(): string {
    const randomNum = Math.floor(Math.random() * 6);
    if (randomNum === 0 || randomNum === 1) {
      return 'assets/img/avatars/avatar.jpg';
    } else {
      return `assets/img/avatars/avatar-${randomNum}.jpg`;
    }
  }
}
