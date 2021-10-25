import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorPaletteComponent } from './color-palette.component';

const routes: Routes = [
  {
    path: '',
    component: ColorPaletteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorPaletteRoutingModule {}
