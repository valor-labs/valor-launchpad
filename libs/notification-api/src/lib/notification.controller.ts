import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { User } from '@valor-launchpad/users-api';
import { NotificationService } from './notification.service';
import { QueryNotificationListDto } from './dto/query-notification-list.dto';
import { NotificationPaginatedListVo } from '@valor-launchpad/api-interfaces';
import { MarkAsReadDto } from './dto/mark-as-read.dto';

@Controller('v1')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  getNotifications(
    @Query() query: QueryNotificationListDto,
    @User() actingUser
  ): Promise<NotificationPaginatedListVo> {
    return this.notificationService.getNotifications(query, actingUser.id);
  }

  @Post('markAsRead')
  markAllAsRead(@Body() markAsReadDto: MarkAsReadDto, @User() actingUser) {
    return this.notificationService.markAllAsRead(markAsReadDto, actingUser.id);
  }
}
