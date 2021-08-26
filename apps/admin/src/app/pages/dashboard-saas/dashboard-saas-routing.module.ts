import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSaasComponent } from './dashboard-saas.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardSaasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSaasRoutingModule {}
