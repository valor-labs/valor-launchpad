import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatablesMultiComponent } from './datatables-multi.component';

const routes: Routes = [
  {
    path: '',
    component: DatatablesMultiComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatatablesMultiRoutingModule { }
