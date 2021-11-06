import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';
import { THREADS } from '../seed-data/chat-thread.data';

export class ChatThreadSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    for (const thread of THREADS) {
      await this.prisma.chatThread.create({
        data: {
          id: thread.id,
          isGroup: thread.isGroup,
          name: thread.name,
          chatThreadUsers: {
            createMany: {
              data: thread.users.map((i) => ({ userId: i.id })),
            },
          },
        },
      });
    }
    return;
  }

  async delete(): Promise<unknown> {
    await this.prisma.chatThreadUser.deleteMany();
    return this.prisma.chatThread.deleteMany();
  }
}
