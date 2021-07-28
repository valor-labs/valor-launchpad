import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UiGeneralComponent} from "./ui-general.component";

const routes: Routes = [
  {
    path: '', component: UiGeneralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiGeneralRoutingModule { }
