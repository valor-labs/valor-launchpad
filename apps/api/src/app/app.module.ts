import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from '../projects/projects.module';
import { ProfileModule } from '../profile/profile.module';
import { AuthApiModule } from '@valor-launchpad/auth-api';
import { RouterModule } from 'nest-router';
import { DashboardModule } from '../dashboard/dashboard-default/dashboard.module';
import { DashboardAnalyticsModule } from '../dashboard/dashboard-analytics/dashboard-analytics.module';
import { StripeApiModule } from '@valor-launchpad/stripe-api';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProjectsListener } from './listeners/projects.listener';
import { UsersApiModule } from '@valor-launchpad/users-api';
import { PrismaModule } from '@valor-launchpad/prisma';
import { DashboardSocialModule } from '../dashboard/dashboard-social/dashboard-social.module';
import { DashboardCryptoModule } from '../dashboard/dashboard-crypto';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisModule } from 'nestjs-redis';
import { ThrottlerModule } from '@nestjs/throttler';
import { NotificationApiModule } from '@valor-launchpad/notification-api';
import { SocketGatewayModule } from '@valor-launchpad/socket-gateway';
import { TasksModule } from '../pages/tasks';
@Module({
  imports: [
    EventEmitterModule.forRoot({ wildcard: true }),
    PrismaModule,
    RedisModule.register({
      url: process.env.REDIS_URL,
    }),
    RouterModule.forRoutes([
      { path: '/dashboard', module: DashboardModule },
      { path: '/dashboard-analytics', module: DashboardAnalyticsModule },
      { path: '/dashboard-social', module: DashboardSocialModule },
      { path: '/dashboard-crypto', module: DashboardCryptoModule },
      { path: '/profile', module: ProfileModule },
      { path: '/projects', module: ProjectsModule },
      { path: '/auth', module: AuthApiModule },
      { path: '/stripe', module: StripeApiModule },
      { path: '/users', module: UsersApiModule },
      { path: '/notifications', module: NotificationApiModule },
      { path: '/tasks', module: TasksModule },
    ]),
    ProjectsModule,
    ProfileModule,
    AuthApiModule,
    UsersApiModule,
    DashboardModule,
    DashboardModule,
    DashboardAnalyticsModule,
    StripeApiModule,
    DashboardSocialModule,
    DashboardCryptoModule,
    SocketGatewayModule,
    NotificationApiModule,
    TasksModule,
    MulterModule.register({
      dest: join(__dirname, '/assets'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/assets'),
      serveStaticOptions: {
        index: false,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 3,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProjectsListener],
})
export class AppModule {}
