import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async getNotifications(userId: string) {
    return await this.prisma.notification.findMany({
      where: { deletedDate: null, userId, read: false },
      orderBy: { createdDate: 'desc' },
    });
  }

  markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId },
      data: {
        read: true,
        readDate: new Date(),
      },
    });
  }
}
