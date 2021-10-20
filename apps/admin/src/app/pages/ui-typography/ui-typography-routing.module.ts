import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiTypographyComponent } from './ui-typography.component';

const routes: Routes = [
  {
    path: '',
    component: UiTypographyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiTypographyRoutingModule {}
