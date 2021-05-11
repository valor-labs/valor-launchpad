import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectsListComponent} from "./projects-list.component";
import {ProjectsListService} from "./projects-list.service";

const routes: Routes = [
  {
    path:'', component: ProjectsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ProjectsListService],
  exports: [RouterModule]
})
export class ProjectsListRoutingModule { }
