import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsAdvancedInputsComponent } from './forms-advanced-inputs.component';

const routes: Routes = [{ path: '', component: FormsAdvancedInputsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsAdvancedInputsRoutingModule {}
