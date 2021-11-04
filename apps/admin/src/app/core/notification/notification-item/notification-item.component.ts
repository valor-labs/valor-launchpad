import { Component, HostBinding, Input } from '@angular/core';
import { NotificationVo } from '@valor-launchpad/api-interfaces';
import { NOTIFICATION_TYPE_MAPPING } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {
  @HostBinding('class.list-group-item') private h = true;
  @Input() notification: NotificationVo;

  mapping = NOTIFICATION_TYPE_MAPPING;
}
