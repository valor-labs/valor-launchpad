import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsEditorsComponent } from './forms-editors.component';

const routes: Routes = [{ path: '', component: FormsEditorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsEditorsRoutingModule {}
