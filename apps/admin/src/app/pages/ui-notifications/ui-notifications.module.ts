import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiNotificationsRouting } from './ui-notifications.routing';
import { UiNotificationsComponent } from './ui-notifications.component';
import { UiModule } from '@valor-launchpad/ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UiNotificationsComponent],
  imports: [
    CommonModule,
    UiNotificationsRouting,
    UiModule,
    ReactiveFormsModule,
  ],
})
export class UiNotificationsModule {}
