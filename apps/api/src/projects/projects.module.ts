import {Module} from '@nestjs/common';
import {ProjectsController} from './projects.controller';
import {ProjectsService} from './projects.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectsEntity} from "./projects.entity";
import {CommentEntity} from "./comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity, CommentEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {
}
