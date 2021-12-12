import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '@valor-launchpad/common-api';
import { TaskEntity } from '@valor-launchpad/api-interfaces';

export enum TaskType {
  UPCOMING = 'UPCOMING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface TaskGroup {
  upcoming: TaskEntity[];
  inprogress: TaskEntity[];
  completed: TaskEntity[];
}

export const taskGroupMapping = {
  'tasks-progress': TaskType.IN_PROGRESS,
  'tasks-completed': TaskType.COMPLETED,
  'tasks-upcoming': TaskType.UPCOMING,
};

export enum TaskModelType {
  Add = 'Add',
  View = 'View',
  Edit = 'Edit',
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiBase = this.config.environment.apiBase;

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient
  ) {}

  getTasks(): Observable<TaskEntity[]> {
    return this.http
      .get<Partial<IResponse>>(`${this.apiBase}api/tasks/v1/user-tasks`)
      .pipe(
        map(({ data, success }) => {
          if (success) {
            return data;
          }
        })
      );
  }

  updateTasks(
    tasks: TaskEntity[]
  ): Observable<{ success: boolean; tasks: TaskEntity[]; message: string }> {
    return this.http
      .put<Partial<IResponse>>(`${this.apiBase}api/tasks/v1/update-tasks`, {
        tasks,
      })
      .pipe(
        map(({ data, success, message }) => {
          return {
            success,
            tasks: data,
            message,
          };
        })
      );
  }

  createTasks(
    task: TaskEntity
  ): Observable<{ success: boolean; tasks: TaskEntity[]; message: string }> {
    return this.http
      .post<Partial<IResponse>>(`${this.apiBase}api/tasks/v1/create-task`, {
        task,
      })
      .pipe(
        map(({ data, success, message }) => {
          return {
            success,
            tasks: data,
            message,
          };
        })
      );
  }

  deleteTask(
    task
  ): Observable<{ success: boolean; tasks: TaskEntity[]; message: string }> {
    return this.http
      .delete<Partial<IResponse>>(
        `${this.apiBase}api/tasks/v1/delete-task/${task.id}`
      )
      .pipe(
        map(({ data, success, message }) => {
          return {
            success,
            tasks: data,
            message,
          };
        })
      );
  }
}
