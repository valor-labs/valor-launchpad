import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetNewPasswordComponent } from './reset-new-password.component';

const routes: Routes = [
  {
    path: '',
    component: ResetNewPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetNewPasswordRoutingModule {}
