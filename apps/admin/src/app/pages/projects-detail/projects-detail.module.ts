import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsDetailRoutingModule } from './projects-detail-routing.module';
import { ProjectsDetailComponent } from './projects-detail.component';
import {UiModule} from "@valor-launchpad/ui";


@NgModule({
  declarations: [
    ProjectsDetailComponent
  ],
  imports: [
    CommonModule,
    ProjectsDetailRoutingModule,
    UiModule
  ]
})
export class ProjectsDetailModule { }
