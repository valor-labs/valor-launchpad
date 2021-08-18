import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableResponsiveComponent } from './table-responsive/table-responsive.component';

const routes: Routes = [
  {
    path: '',
    component: TableResponsiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatatablesResponsiveRoutingModule { }
