import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsListRoutingModule } from './projects-list-routing.module';
import { ProjectsListComponent } from './projects-list.component';
import {ProjectListItemComponent} from "./project-list-item/project-list-item.component";


@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectListItemComponent
  ],
  imports: [
    CommonModule,
    ProjectsListRoutingModule
  ]
})
export class ProjectsListModule { }
