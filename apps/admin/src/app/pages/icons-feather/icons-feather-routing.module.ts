import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IconsFeatherComponent} from "./icons-feather.component";

const routes: Routes = [
  {
    path: '', component: IconsFeatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsFeatherRoutingModule {
}
