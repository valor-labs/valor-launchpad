import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiTabsComponent } from './ui-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: UiTabsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiTabsRoutingModule {}
