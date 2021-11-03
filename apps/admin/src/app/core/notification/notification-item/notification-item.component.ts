import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NotificationVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {
  @HostBinding('class.list-group-item') private h = true;
  @Input() notification: NotificationVo;

  mapping: Record<NotificationVo['type'], any> = {
    COMMENT: {
      title: 'Commented',
      icon: 'far fa-fw fa-comment text-primary',
    },
    REPLY_COMMENT: {
      title: 'Replied',
      icon: 'fas fa-fw fa-reply text-primary',
    },
    LIKE_COMMENT: {
      title: 'liked',
      icon: 'fas fa-fw fa-heart text-danger',
    },
  };
}
