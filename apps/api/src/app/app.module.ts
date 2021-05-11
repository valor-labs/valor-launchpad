import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProjectsModule} from "../projects/projects.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
