import { Component, OnInit } from '@angular/core';
import { NotificationVo } from '@valor-launchpad/api-interfaces';
import { NotificationSocketService } from '../notification-socket.service';

@Component({
  selector: 'valor-launchpad-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.scss'],
})
export class NotificationDropdownComponent implements OnInit {
  notifications: NotificationVo[] = [];
  constructor(private notificationSocketService: NotificationSocketService) {}

  ngOnInit(): void {
    this.notificationSocketService
      .fetchNotifications()
      .subscribe((res) => (this.notifications = res.data));
    this.notificationSocketService
      .listenNewNotification()
      .subscribe((newNotification) => {
        this.notifications.unshift(newNotification);
      });
  }

  markAllAsRead(event: MouseEvent) {
    event.stopPropagation();
    this.notificationSocketService.markAllAsRead().subscribe(() => {
      // todo: switchMap or replace this.notifications directly
      this.notificationSocketService
        .fetchNotifications()
        .subscribe((res) => (this.notifications = res.data));
    });
  }
}
