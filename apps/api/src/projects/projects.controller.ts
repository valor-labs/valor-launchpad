import {Controller, Get, NotFoundException, Param} from '@nestjs/common';
import {Project, ProjectDetail} from "@api/projects";
import {ProjectsService} from "./projects.service";
import {HttpErrorResponse} from "@angular/common/http";

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {
  }

  @Get('all')
  async getAll(): Promise<Array<Project>> {
    return this.projectsService.getAll();
  }

  @Get('single/:id')
  async getSingle(@Param() params): Promise<ProjectDetail | HttpErrorResponse> {
    const project = await this.projectsService.getSingle(params.id);
    /*TODO: improve this check */
    if (typeof project !== 'undefined') {
      return project
    } else {
      throw new NotFoundException();
    }
  }
}
