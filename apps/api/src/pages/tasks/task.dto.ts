import { TaskEntity } from '@valor-launchpad/common-api';

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
