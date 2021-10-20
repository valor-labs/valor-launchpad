import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesBootstrapComponent } from './tables-bootstrap.component';

const routes: Routes = [
  {
    path: '',
    component: TablesBootstrapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesBootstrapRouting {}
