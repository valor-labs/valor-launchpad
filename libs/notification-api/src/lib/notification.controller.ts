import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { User } from '@valor-launchpad/users-api';
import { NotificationService } from './notification.service';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  getNotifications(@User() actingUser) {
    return this.notificationService.getNotifications(actingUser.id);
  }

  @Post('markAsRead')
  markAllAsRead(@User() actingUser) {
    return this.notificationService.markAllAsRead(actingUser.id);
  }
}
