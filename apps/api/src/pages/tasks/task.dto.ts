import { TaskEntity } from '@valor-launchpad/api-interfaces';

export interface UpdateTasksDto {
  tasks: Omit<TaskEntity, 'user'>[];
}

export interface CreateTasksDto {
  task: Omit<TaskEntity, 'id'>;
}

export interface DeleteTaskDto {
  deleteTask: Omit<TaskEntity, 'user'>;
  updateTasks: Omit<TaskEntity, 'user'>[];
}
