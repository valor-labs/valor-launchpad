import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiNotificationsComponent } from './ui-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: UiNotificationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiNotificationsRouting {}
