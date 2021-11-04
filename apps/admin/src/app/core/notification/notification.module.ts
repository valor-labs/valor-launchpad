import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { NotificationDropdownComponent } from './notification-dropdown/notification-dropdown.component';
import { UiModule } from '@valor-launchpad/ui';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationItemComponent,
    NotificationDropdownComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    BsDropdownModule,
    TooltipModule,
    RouterModule,
  ],
  exports: [NotificationListComponent, NotificationDropdownComponent],
})
export class NotificationModule {}
