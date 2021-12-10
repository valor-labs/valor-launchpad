import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getClients(user_id: string) {
    return await this.prisma.clientsEntity.findMany({
      where: {
        user_id,
      },
      select: {
        user_id: true,
        avatar: true,
        name: true,
        company: true,
        email: true,
        phone: true,
        status: true,
        description: true,
        timeline: {
          orderBy: {
            time: 'desc',
          },
        },
      },
    });
  }
}
