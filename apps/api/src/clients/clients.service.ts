import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getClients(user_id: string) {
    return await this.prisma.passwordValidationEntity.findUnique({
      where: {
        user_id: user_id,
      },
    });
  }
}
