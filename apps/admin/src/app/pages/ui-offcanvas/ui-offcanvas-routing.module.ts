import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiOffCanvasComponent } from './ui-offcanvas.component';

const routes: Routes = [
  {
    path: '',
    component: UiOffCanvasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiOffcanvasRoutingModule {}
