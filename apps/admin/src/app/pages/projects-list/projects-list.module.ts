import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsListRoutingModule } from './projects-list-routing.module';
import { ProjectsListComponent } from './projects-list.component';
import {ProjectListItemComponent} from "./project-list-item/project-list-item.component";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UiModule } from '@valor-launchpad/ui';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectListItemComponent
  ],
  imports: [
    CommonModule,
    ProjectsListRoutingModule,
    BsDropdownModule.forRoot(),
    UiModule,
    ReactiveFormsModule
  ]
})
export class ProjectsListModule { }
