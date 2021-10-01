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
import { MulterModule } from '@nestjs/platform-express'
import { join } from 'path';
@Module({
  imports: [
    EventEmitterModule.forRoot({ wildcard: true }),
    PrismaModule,
    RouterModule.forRoutes([
      { path: '/dashboard', module: DashboardModule },
      { path: '/dashboard-analytics', module: DashboardAnalyticsModule },
      { path: '/dashboard-social', module: DashboardSocialModule },
      { path: '/dashboard-crypto', module: DashboardCryptoModule},
      { path: '/profile', module: ProfileModule },
      { path: '/projects', module: ProjectsModule },
      { path: '/auth', module: AuthApiModule },
      { path: '/stripe', module: StripeApiModule },
      { path: '/users', module: UsersApiModule },
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
    MulterModule.register({
      dest: join(__dirname, '/src/assets'),
    })
  ],
  controllers: [AppController],
  providers: [AppService, ProjectsListener],
})
export class AppModule {
  constructor() {
    console.log('__dirname', __dirname);
  }
}
