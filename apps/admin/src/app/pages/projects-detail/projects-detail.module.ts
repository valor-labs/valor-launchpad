import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsDetailRoutingModule } from './projects-detail-routing.module';
import { ProjectsDetailComponent } from './projects-detail.component';
import { CommentModule, UiModule } from '@valor-launchpad/ui';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ProjectsDetailComponent],
  imports: [
    CommonModule,
    ProjectsDetailRoutingModule,
    UiModule,
    NgxChartsModule,
    BsDropdownModule.forRoot(),
    CommentModule,
    FormsModule,
  ],
})
export class ProjectsDetailModule {}
