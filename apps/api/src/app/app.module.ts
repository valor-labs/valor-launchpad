import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProjectsModule} from "../projects/projects.module";
import {ProfileModule} from "../profile/profile.module";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {RouterModule} from "nest-router";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT as any as number,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: process.env.TYPEORM_AUTOLOAD as any as boolean,
      synchronize:  process.env.TYPEORM_SYNCHRONIZE as any as boolean,
    }),
    RouterModule.forRoutes([
      {path:'/profile', module: ProfileModule},
      {path:'/projects', module: ProjectsModule},
      {path:'/auth', module: AuthModule}
    ]),
    ProjectsModule, ProfileModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
