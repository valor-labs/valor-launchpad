import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiCarouselComponent } from './ui-carousel.component';

const routes: Routes = [
  {
    path: '',
    component: UiCarouselComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiCarouselRoutingModule {}
