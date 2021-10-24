import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatablesAjaxComponent } from './datatables-ajax.component';

const routes: Routes = [
  {
    path: '',
    component: DatatablesAjaxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatatablesAjaxRoutingModule {}
