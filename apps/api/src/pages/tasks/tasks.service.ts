import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';
import { TaskEntity } from '@valor-launchpad/api-interfaces';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getUserTasks(): Promise<TaskEntity[]> {
    const tasks = await this.prisma.taskEntity.findMany({
      where: {
        deletedDate: {
          equals: null,
        },
      },
      orderBy: [
        {
          taskStatus: 'asc',
        },
        {
          taskIndex: 'asc',
        },
      ],
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profile: {
              select: {
                id: true,
                avatar: {
                  select: {
                    src: true,
                    src_webp: true,
                    alt: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return tasks.map((task) => {
      const { id, taskIndex, title, desc, taskStatus, user } = task;

      return {
        id,
        title,
        desc,
        taskStatus,
        taskIndex,
        user,
      };
    });
  }

  async createTask(task: Partial<TaskEntity>, userId: string) {
    const { title, desc, taskStatus } = task;
    const maxTask = await this.prisma.taskEntity.aggregate({
      where: {
        taskStatus,
      },
      _max: {
        taskIndex: true,
      },
    });
    const taskIndex = maxTask ? maxTask._max.taskIndex + 1 : 0;

    return await this.prisma.taskEntity.create({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profile: {
              select: {
                id: true,
                avatar: {
                  select: {
                    src: true,
                    src_webp: true,
                    alt: true,
                  },
                },
              },
            },
          },
        },
      },
      data: {
        title,
        desc,
        taskIndex,
        taskStatus,
        userId,
      },
    });
  }

  async updateTasks(tasks: Partial<TaskEntity>[]) {
    const excutes = [];

    tasks.forEach((task) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, user, ...other } = task;
      if (!id) return;

      excutes.push(
        this.prisma.taskEntity.update({
          data: {
            ...other,
          },
          where: {
            id,
          },
        })
      );
    });

    return await this.prisma.$transaction(excutes);
  }

  async deleteTask(id: string) {
    const task = await this.prisma.taskEntity.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    const updateTasks = await this.prisma.taskEntity.findMany({
      where: {
        taskStatus: task.taskStatus,
        taskIndex: {
          gt: task.taskIndex,
        },
      },
    });

    const excutes = [];

    excutes.push(
      this.prisma.taskEntity.deleteMany({
        where: {
          id,
        },
      })
    );

    updateTasks.forEach((task) => {
      const { id, taskIndex } = task;

      excutes.push(
        this.prisma.taskEntity.update({
          data: {
            taskIndex: taskIndex - 1,
          },
          where: {
            id,
          },
        })
      );
    });

    return await this.prisma.$transaction(excutes);
  }
}
