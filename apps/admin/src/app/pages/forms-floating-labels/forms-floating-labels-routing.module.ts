import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsFloatingLabelsComponent } from './forms-floating-labels.component';

const routes: Routes = [{ path: '', component: FormsFloatingLabelsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsFloatingLabelsRoutingModule {}
