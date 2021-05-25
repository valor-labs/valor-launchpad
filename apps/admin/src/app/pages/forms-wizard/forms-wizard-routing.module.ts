import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsWizardComponent } from './forms-wizard.component';

const routes: Routes = [
  { path: '', component: FormsWizardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsWizardRoutingModule {}
