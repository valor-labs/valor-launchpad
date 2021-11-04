import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { UiModule } from '@valor-launchpad/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    UiModule,
    NgxDatatableModule,
  ],
})
export class NotificationsModule {}
