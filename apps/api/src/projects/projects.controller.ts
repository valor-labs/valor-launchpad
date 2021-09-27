import {Body, Controller, Get, NotFoundException, Param, Post, UseGuards} from '@nestjs/common';
import {ProjectsService} from "./projects.service";
import {JwtAuthGuard} from '@valor-launchpad/auth-api';
import {Prisma} from '@prisma/client';
import { Project } from '@api/projects';

@UseGuards(JwtAuthGuard)
@Controller('v1')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {
  }

  @Get('isProjectExist/:title')
  async isProjectExist(@Param() params) {
    const project = await this.projectsService.getProjectByTitle(params.title);
    if (project !== null) {
      return true;
    } else {
      return false;
    }
  }

  @Post('create')
  async createProject(@Body() createProjectDto: Project) {
    return await this.projectsService.createProject(createProjectDto);
  }

  @Get('all')
  //TODO: Understand why this is entity and not the class from api
  async getAll() {
    return await this.projectsService.getAll();
  }

  @Get('single/:id')
  //TODO: Understand why this is entity and not the class from api
  async getSingle(@Param() params) {
    const project = await this.projectsService.getSingle(params.id);
    /*TODO: improve this check */
    if (typeof project !== 'undefined') {
      return project
    } else {
      throw new NotFoundException();
    }
  }
}
