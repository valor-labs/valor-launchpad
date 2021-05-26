import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsLayoutsComponent } from './forms-layouts.component';

const routes: Routes = [
  {path: '', component: FormsLayoutsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsLayoutsRoutingModule {}
