import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { USER_EVENTS } from '../seed-data/user-events.data';

export class UserEventsSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    return await this.prisma.userEventsEntity.createMany({
      data: USER_EVENTS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.userEventsEntity.deleteMany();
  }
}
