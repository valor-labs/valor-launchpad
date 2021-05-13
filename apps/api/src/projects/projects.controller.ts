import {Controller, Get, NotFoundException, Param} from '@nestjs/common';
import {ProjectDetail} from "@api/projects";
import {ProjectsService} from "./projects.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProjectsEntity} from "./projects.entity";

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {
  }

  @Get('all')
  //TODO: Understand why this is entity and not the class from api
  async getAll(): Promise<Array<ProjectsEntity>> {
    return await this.projectsService.getAll();
  }

  @Get('single/:id')
  //TODO: Understand why this is entity and not the class from api
  async getSingle(@Param() params): Promise<ProjectsEntity | HttpErrorResponse> {
    const project = await this.projectsService.getSingle(params.id);
    /*TODO: improve this check */
    if (typeof project !== 'undefined') {
      return project
    } else {
      throw new NotFoundException();
    }
  }
}
