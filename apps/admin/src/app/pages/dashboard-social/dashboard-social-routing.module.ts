import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSocialComponent } from './dashboard-social.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardSocialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSocialRoutingModule {}
