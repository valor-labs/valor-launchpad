import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { TasksService } from './tasks.service';
import { UpdateTasksDto, CreateTasksDto, DeleteTaskDto } from './task.dto';
import { ResponseError, ResponseSuccess } from '@valor-launchpad/common-api';
import { User } from '@valor-launchpad/users-api';
import { UserEntity } from '@valor-launchpad/common-api';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('user-tasks')
  async getTasks() {
    try {
      const tasks = await this.tasksService.getUserTasks();

      return new ResponseSuccess('Load Tasks Success', tasks);
    } catch (e) {
      return new ResponseError('Load Tasks Failed');
    }
  }

  @Put('update-tasks')
  async updateTasks(@Body() updateTasksDto: UpdateTasksDto) {
    try {
      await this.tasksService.updateTasks(updateTasksDto.tasks);
      const tasks = await this.tasksService.getUserTasks();

      return new ResponseSuccess('Update Tasks Success', tasks);
    } catch (e) {
      return new ResponseError('Update Tasks Failed');
    }
  }

  @Post('create-task')
  async createTask(
    @Body() createTasksDto: CreateTasksDto,
    @User() currentUser: UserEntity
  ) {
    try {
      const task = await this.tasksService.createTask(
        createTasksDto.task,
        currentUser.id
      );
      const { id, title, desc, taskIndex, taskStatus, userId } = task;

      return new ResponseSuccess('Create Task Success', [
        {
          id,
          title,
          desc,
          taskIndex,
          taskStatus,
          user: {
            id: userId,
            avatar: currentUser.avatar?.src,
          },
        },
      ]);
    } catch (e) {
      return new ResponseError('Create Task Failed');
    }
  }

  @Delete('delete-task/:id')
  async deleteTask(@Param('id') id: string) {
    try {
      await this.tasksService.deleteTask(id);
      const tasks = await this.tasksService.getUserTasks();

      return new ResponseSuccess('Delete Task Success', tasks);
    } catch (e) {
      console.log(e);
      return new ResponseError('Delete Task Failed');
    }
  }
}
