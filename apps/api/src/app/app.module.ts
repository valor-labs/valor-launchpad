import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProjectsModule} from '../projects/projects.module';
import {ProfileModule} from '../profile/profile.module';
import {AuthApiModule} from '@valor-launchpad/auth-api';
import {RouterModule} from 'nest-router';
import {DashboardModule} from '../dashboard/dashboard-default/dashboard.module';
import {DashboardAnalyticsModule} from '../dashboard/dashboard-analytics/dashboard-analytics.module';
import {StripeApiModule} from '@valor-launchpad/stripe-api';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {ProjectsListener} from './listeners/projects.listener';
import {UsersApiModule} from '@valor-launchpad/users-api';
import {PrismaModule} from '@valor-launchpad/prisma';

@Module({
  imports: [
    EventEmitterModule.forRoot({wildcard: true}),
    PrismaModule,
    RouterModule.forRoutes([
      {path: '/dashboard', module: DashboardModule},
      {path: '/dashboard-analytics', module: DashboardAnalyticsModule},
      {path: '/profile', module: ProfileModule},
      {path: '/projects', module: ProjectsModule},
      {path: '/auth', module: AuthApiModule},
      {path: '/stripe', module: StripeApiModule},
      {path: '/users', module: UsersApiModule}
    ]),
    ProjectsModule, ProfileModule, AuthApiModule, UsersApiModule, DashboardModule, DashboardModule, DashboardAnalyticsModule, StripeApiModule
  ],
  controllers: [AppController],
  providers: [AppService, ProjectsListener]
})
export class AppModule {
}
