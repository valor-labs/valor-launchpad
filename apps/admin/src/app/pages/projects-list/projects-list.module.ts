import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsListRoutingModule } from './projects-list-routing.module';
import { ProjectsListComponent } from './projects-list.component';


@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    ProjectsListRoutingModule
  ]
})
export class ProjectsListModule { }
