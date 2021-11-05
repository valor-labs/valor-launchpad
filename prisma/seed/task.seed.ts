import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { generateTasks } from '../seed-data/tasks.data';

export class TaskEntitySeed implements Seeder {
  constructor(private prisma: PrismaClient) { }

  async seed() {
    const tasks = generateTasks();

    return await this.prisma.taskEntity.createMany({
      data: tasks
    });
  }

  async delete() {
    return await this.prisma.taskEntity.deleteMany();
  }
}