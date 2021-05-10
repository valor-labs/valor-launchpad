import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UiAlertsComponent} from "./ui-alerts.component";

const routes: Routes = [
  {
    path:'', component: UiAlertsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiAlertsRoutingModule { }
