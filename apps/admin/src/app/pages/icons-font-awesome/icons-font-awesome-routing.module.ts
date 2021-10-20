import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconsFontAwesomeComponent } from './icons-font-awesome.component';

const routes: Routes = [
  {
    path: '',
    component: IconsFontAwesomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IconsFontAwesomeRoutingModule {}
