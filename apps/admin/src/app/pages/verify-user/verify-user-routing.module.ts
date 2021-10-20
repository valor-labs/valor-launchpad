import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyUserComponent } from './verify-user.component';

const routes: Routes = [{ path: ':token', component: VerifyUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyUserRoutingModule {}
