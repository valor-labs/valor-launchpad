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
import { UpdateTasksDto, CreateTasksDto } from './task.dto';
import { ResponseError, ResponseSuccess } from '@valor-launchpad/common-api';
import { User } from '@valor-launchpad/users-api';
import { RequestingUser } from '@valor-launchpad/api-interfaces';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('user-tasks')
  async getTasks() {
    try {
      const tasks = await this.tasksService.getUserTasks();

      return new ResponseSuccess('Load Tasks Success', tasks);
    } catch (err) {
      return new ResponseError('Load Tasks Failed', err);
    }
  }

  @Put('update-tasks')
  async updateTasks(@Body() updateTasksDto: UpdateTasksDto) {
    try {
      await this.tasksService.updateTasks(updateTasksDto.tasks);
      const tasks = await this.tasksService.getUserTasks();

      return new ResponseSuccess('Update Tasks Success', tasks);
    } catch (err) {
      return new ResponseError('Update Tasks Failed', err);
    }
  }

  @Post('create-task')
  async createTask(
    @Body() createTasksDto: CreateTasksDto,
    @User() currentUser: RequestingUser
  ) {
    try {
      const task = await this.tasksService.createTask(
        createTasksDto.task,
        currentUser.id
      );

      return new ResponseSuccess('Create Task Success', [task]);
    } catch (err) {
      return new ResponseError('Create Task Failed', err);
    }
  }

  @Delete('delete-task/:id')
  async deleteTask(@Param('id') id: string) {
    try {
      await this.tasksService.deleteTask(id);
      const tasks = await this.tasksService.getUserTasks();

      return new ResponseSuccess('Delete Task Success', tasks);
    } catch (err) {
      return new ResponseError('Delete Task Failed', err);
    }
  }
}
