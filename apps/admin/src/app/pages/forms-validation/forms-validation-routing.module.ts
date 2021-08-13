import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsValidationComponent } from './forms-validation.component';

const routes: Routes = [{ path: '', component: FormsValidationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsValidationRoutingModule {}
