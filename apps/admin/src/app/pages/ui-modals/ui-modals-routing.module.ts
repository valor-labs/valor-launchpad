import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModalsComponent } from './ui-modals.component';

const routes: Routes = [{ path: '', component: UiModalsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiModalsRoutingModule {}
