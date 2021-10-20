import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { UiModule } from '@valor-launchpad/ui';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, TasksRoutingModule, UiModule, DragDropModule],
})
export class TasksModule {}
