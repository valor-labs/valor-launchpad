import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaModule } from '@valor-launchpad/prisma';
import { CommentService } from './services/comment.service';
import { NotificationApiModule } from '@valor-launchpad/notification-api';

@Module({
  imports: [PrismaModule, NotificationApiModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, CommentService],
})
export class ProjectsModule {}
