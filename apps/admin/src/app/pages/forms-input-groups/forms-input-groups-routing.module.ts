import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsInputGroupsComponent } from './forms-input-groups.component';

const routes: Routes = [
  {path: '', component: FormsInputGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsInputGroupsRoutingModule {}
