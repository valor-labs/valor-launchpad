import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatablesColumnSearchComponent } from './datatables-column-search.component';

const routes: Routes = [
  {
    path: '',
    component: DatatablesColumnSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatatablesColumnSearchRoutingModule {}
