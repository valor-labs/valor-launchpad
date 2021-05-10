import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UiButtonsComponent} from "./ui-buttons.component";

const routes: Routes = [
  {
    path: '', component: UiButtonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiButtonsRoutingModule { }
