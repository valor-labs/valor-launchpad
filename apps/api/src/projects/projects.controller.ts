import {Body, Controller, Get, NotFoundException, Param, Post, UseGuards} from '@nestjs/common';
import {ProjectsService} from "./projects.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProjectsEntity} from "./projects.entity";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('v1')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {
  }

  @Post('create')
  async createProject(@Body() createProjectDto) {
    return await this.projectsService.createProject(createProjectDto);
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
