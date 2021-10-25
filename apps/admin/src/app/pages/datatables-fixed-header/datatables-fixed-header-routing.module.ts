import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatablesFixedHeaderComponent } from './datatables-fixed-header.component';

const routes: Routes = [
  {
    path: '',
    component: DatatablesFixedHeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatatablesFixedHeaderRoutingModule {}
