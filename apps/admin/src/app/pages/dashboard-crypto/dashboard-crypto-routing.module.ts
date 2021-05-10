import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardCryptoComponent} from "./dashboard-crypto.component";

const routes: Routes = [
  {
    path:'', component: DashboardCryptoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardCryptoRoutingModule { }
