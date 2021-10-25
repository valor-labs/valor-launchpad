import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiGridComponent } from './ui-grid.component';

const routes: Routes = [{ path: '', component: UiGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiGridRoutingModule {}
