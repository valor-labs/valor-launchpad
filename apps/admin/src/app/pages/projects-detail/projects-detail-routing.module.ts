import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsDetailComponent } from './projects-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProjectsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsDetailRoutingModule {}
