import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiEmbedVideoComponent } from './ui-embed-video.component';

const routes: Routes = [
  {
    path: '', component: UiEmbedVideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiEmbedVideoRoutingModule { }
