import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post, UploadedFile,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import {ProjectsService} from "./projects.service";
import {JwtAuthGuard} from '@valor-launchpad/auth-api';
import { ProjectCreateDto } from './dto/project-create-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploaderUtility } from '../media/imageUploader.utility';
import { ProjectListItemVo } from '@valor-launchpad/api-interfaces';

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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: ImageUploaderUtility.getStorageOptions()
    })
  )
  async create(@Body() project: ProjectCreateDto, @UploadedFile() file) {
    return await this.projectsService.createProject(project, file);
  }

  @Get('all')
  //TODO: Understand why this is entity and not the class from api
  async getAll(): Promise<ProjectListItemVo[]> {
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
