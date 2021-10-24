import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsGoogleComponent } from './maps-google.component';

const routes: Routes = [
  {
    path: '',
    component: MapsGoogleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsGoogleRoutingModule {}
