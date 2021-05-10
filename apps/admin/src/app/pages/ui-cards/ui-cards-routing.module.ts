import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UiCardsComponent} from "./ui-cards.component";

const routes: Routes = [
  {
    path: '', component: UiCardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiCardsRoutingModule {
}
