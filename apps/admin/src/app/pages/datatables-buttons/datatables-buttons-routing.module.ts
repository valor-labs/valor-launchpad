import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatablesButtonsComponent } from './datatables-buttons.component';

const routes: Routes = [
  {
    path: '',
    component: DatatablesButtonsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatatablesButtonsRoutingModule {}
