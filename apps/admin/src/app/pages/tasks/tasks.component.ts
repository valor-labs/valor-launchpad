import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  TasksService,
  TaskType,
  TaskGroup,
  taskGroupMapping,
  TaskModelType,
} from './tasks.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskEntity } from '@valor-launchpad/common-api';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'valor-launchpad-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  constructor(
    private tasksService: TasksService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {}
  tasks$: BehaviorSubject<TaskEntity[]> = new BehaviorSubject([]);
  taskGroup: TaskGroup;
  private destroy$ = new Subject();
  taskFormGroup: FormGroup = this.fb.group({
    title: ['', Validators.required],
    desc: ['', Validators.required],
    taskStatus: ['', Validators.required],
  });
  taskTypes = Object.values(taskGroupMapping);
  currentTask: TaskEntity;
  modelType: TaskModelType = TaskModelType.Edit;

  upComingActions: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  inProgressActions: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  completedActions: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  @ViewChild('taskModal') taskModal: ModalDirective;

  ngOnInit() {
    this.loadTasks();
    this.trackTaskGroup();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackTaskGroup() {
    this.tasks$.pipe(takeUntil(this.destroy$)).subscribe((tasks) => {
      this.taskGroup = {
        upcoming: tasks.filter((task) => task.taskStatus === TaskType.UPCOMING),
        inprogress: tasks.filter(
          (task) => task.taskStatus === TaskType.IN_PROGRESS
        ),
        completed: tasks.filter(
          (task) => task.taskStatus === TaskType.COMPLETED
        ),
      };
    });
  }

  loadTasks() {
    this.tasksService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks: TaskEntity[]) => {
        this.tasks$.next(tasks);
      });
  }

  onDrop(event: CdkDragDrop<TaskEntity[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (
      event.container.id !== event.previousContainer.id ||
      event.currentIndex !== event.previousIndex
    ) {
      const updatedTasks = this.prepareUpdatedTasks(event);
      this.tasksService
        .updateTasks(updatedTasks)
        .pipe(takeUntil(this.destroy$))
        .subscribe(({ success, tasks, message }) => {
          if (success) {
            this.toastrService.success(message);
            this.tasks$.next(tasks);
          } else {
            this.toastrService.error(message);
          }
        });
    }
  }

  prepareUpdatedTasks(event: CdkDragDrop<TaskEntity[]>): TaskEntity[] {
    let updateTasks = [
      ...event.container.data.map((task: TaskEntity, taskIndex) => {
        return {
          ...task,
          taskIndex,
          taskStatus: taskGroupMapping[event.container.id],
        };
      }),
    ];

    if (event.previousContainer.id !== event.container.id) {
      updateTasks = [
        ...updateTasks,
        ...event.previousContainer.data.map((task: TaskEntity, taskIndex) => {
          return {
            ...task,
            taskIndex,
          };
        }),
      ];
    }
    return updateTasks;
  }

  openAddTaskModel(taskStatus?) {
    this.modelType = TaskModelType.Add;
    this.taskFormGroup.reset();
    this.taskFormGroup.enable();
    if (taskStatus) {
      this.taskFormGroup.get('taskStatus').setValue(taskStatus);
      this.taskFormGroup.get('taskStatus').disable();
    }
    this.taskModal.show();
  }

  openViewTaskModel(task: TaskEntity) {
    const { title, desc, taskStatus } = task;

    this.currentTask = task;
    this.modelType = TaskModelType.View;
    this.taskFormGroup.patchValue({
      title,
      desc,
      taskStatus,
    });
    this.taskFormGroup.disable();
    this.taskModal.show();
  }

  openTaskModel(taskStatus?) {
    this.taskFormGroup.reset();
    if (taskStatus) {
      this.taskFormGroup.get('taskStatus').setValue(taskStatus);
      this.taskFormGroup.get('taskStatus').disable();
    }
    this.taskModal.show();
  }

  editTask() {
    if (this.modelType !== TaskModelType.View) return;

    this.modelType = TaskModelType.Edit;
    this.taskFormGroup.enable();
  }

  deleteTask() {
    this.tasksService
      .deleteTask(this.currentTask)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ success, tasks, message }) => {
        if (success) {
          this.toastrService.success(message);
          this.tasks$.next(tasks);
        } else {
          this.toastrService.error(message);
        }

        this.taskModal.hide();
      });
  }

  getTaskTypeLabel(type: string) {
    return type
      .toLowerCase()
      .replace(/^\S/, (s) => s.toUpperCase())
      .replace('_', ' ');
  }

  cancelTaskModel() {
    this.taskFormGroup.reset();
    this.taskModal.hide();
  }

  submitTaskModel() {
    this.taskModal.hide();
    this.taskFormGroup.enable();
    const task = this.taskFormGroup.value;

    if (this.modelType === TaskModelType.Add) {
      this.tasksService
        .createTasks(task)
        .pipe(takeUntil(this.destroy$))
        .subscribe(({ success, tasks, message }) => {
          if (success) {
            this.toastrService.success(message);
            this.tasks$.next([...this.tasks$.value, ...tasks]);
          } else {
            this.toastrService.error(message);
          }
        });
    } else if (
      //TODO
      this.modelType === TaskModelType.Edit
    ) {
      this.tasksService
        .updateTasks([
          {
            ...this.currentTask,
            ...task,
          },
        ])
        .subscribe();
    }

    this.taskFormGroup.reset();
  }
}
