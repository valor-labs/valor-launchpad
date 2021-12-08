import { Component, Input } from '@angular/core';
import { NotificationVo } from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent {
  @Input() notifications: NotificationVo[] = [];
}
