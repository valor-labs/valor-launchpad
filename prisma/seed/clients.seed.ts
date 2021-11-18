import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';
import { CLIENTS } from '../seed-data/clients.data';

export class ClientsSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed(): Promise<unknown> {
    for (const client of CLIENTS) {
      await this.prisma.clientsEntity.create({
        data: {
            avatar: client.avatar,
            name: client.name,
            user_id: client.user_id,
            company: client.company,
            email: client.email,   
            phone: client.phone,  
            status: client.status,  
            description: client.description,
            timeline: {
                createMany: {
                    data: client.timeline,
                },
            }
        }
      });
    }
    return;
  }

  async delete(): Promise<unknown> {
    await this.prisma.timeline.deleteMany();
    return await this.prisma.clientsEntity.deleteMany();
  }
}
