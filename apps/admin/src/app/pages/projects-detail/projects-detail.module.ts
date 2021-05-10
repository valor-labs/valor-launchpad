import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsDetailRoutingModule } from './projects-detail-routing.module';
import { ProjectsDetailComponent } from './projects-detail.component';


@NgModule({
  declarations: [
    ProjectsDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectsDetailRoutingModule
  ]
})
export class ProjectsDetailModule { }
