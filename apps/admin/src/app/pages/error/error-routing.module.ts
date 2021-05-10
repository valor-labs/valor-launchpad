import {NgModule} from '@angular/core';
import {ErrorComponent} from './error.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {
}
