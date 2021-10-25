import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsBasicInputsComponent } from './forms-basic-inputs.component';

const routes: Routes = [{ path: '', component: FormsBasicInputsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsBasicInputsRoutingModule {}
