import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDefaultComponent } from './dashboard-default.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardDefaultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDefaultRoutingModule {}
