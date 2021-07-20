import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UiChipsComponent} from './ui-chips.component';

const routes: Routes = [
  {path: '', component: UiChipsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiChipsRoutingModule {
}
