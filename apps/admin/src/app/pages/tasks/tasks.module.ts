import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { UiModule } from '@valor-launchpad/ui';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksService } from './tasks.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    UiModule,
    DragDropModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
