import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '@valor-launchpad/auth-api';
import { ProjectCreateDto } from './dto/project-create-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploaderUtility } from '../media/imageUploader.utility';
import { ProjectListItemVo } from '@valor-launchpad/api-interfaces';
import { User } from '@valor-launchpad/users-api';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { CommentService } from './services/comment.service';

@UseGuards(JwtAuthGuard)
@Controller('v1')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private commentService: CommentService
  ) {}

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProjectById(id);
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
      storage: ImageUploaderUtility.getStorageOptions(),
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
      return project;
    } else {
      throw new NotFoundException();
    }
  }

  /**
   * fetch all comments under one project
   */
  @Get(':id/comments')
  async getComments(@Param('id') projectId: string, @User() actingUser) {
    return this.commentService.getComments(projectId, actingUser);
  }

  @Post(':id/comments')
  async createComments(
    @User() actingUser,
    @Body() commentDto: CreateProjectCommentDto,
    @Param('id') projectId: string
  ) {
    return this.commentService.createComment(projectId, commentDto, actingUser);
  }

  @Delete(':id/comments/:commentId')
  async deleteComments(
    @User() actingUser,
    @Param('commentId') commentId: string
  ) {
    return this.commentService.deleteComment(commentId, actingUser);
  }

  @Post('comments/:commentId/like')
  async likeComment(@User() actingUser, @Param('commentId') commentId: string) {
    return this.commentService.likeComment(commentId, actingUser);
  }

  @Delete('comments/:commentId/like')
  async unlikeComment(
    @User() actingUser,
    @Param('commentId') commentId: string
  ) {
    return this.commentService.unlikeComment(commentId, actingUser);
  }
}
