import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '@valor-launchpad/prisma';
import { ProjectCreateDto } from './dto/project-create-dto';
import { ImageUploaderUtility } from '../media/imageUploader.utility';
import { ProjectListItemVo } from '@valor-launchpad/api-interfaces';
import { QueryProjectListDto } from './dto/query-project-list.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2
  ) {}

  async createProject(project: ProjectCreateDto, file) {
    const src = file.path;
    const type = file.mimetype;
    const webpSrc = await ImageUploaderUtility.imageToWebp(file);

    const persistedProject = await this.prisma.projectsEntity.create({
      data: {
        title: project.title,
        body: project.body,
        progress: +project.progress,
        status: project.status,
        deletable: project.deletable === 'true',
        cloneable: project.cloneable === 'true',
        hero: {
          create: {
            type,
            src: src.split('/').pop(),
            src_webp: webpSrc.split('/').pop(),
            alt: '',
          },
        },
        assignee: {
          createMany: {
            data: (project.assignee ?? []).map((userId) => ({ userId })),
          },
        },
      },
    });

    this.eventEmitter.emit('project.created.thin', {
      id: persistedProject.id,
    });
    this.eventEmitter.emit('project.created.fat', persistedProject);
    return persistedProject;
  }

  async getAll({
    sort,
    status,
    keyword,
    start,
    end,
  }: QueryProjectListDto): Promise<ProjectListItemVo[]> {
    let sortBy = {};
    if (sort) {
      sortBy = [
        {
          [sort]: 'asc',
        },
        {
          createdDate: 'desc',
        },
      ];
    } else {
      sortBy = {
        createdDate: 'desc',
      };
    }

    let statusFilter = {};

    if (status) {
      statusFilter = {
        deletedDate: null,
        status: { in: status },
      };
    } else {
      statusFilter = {
        deletedDate: null,
      };
    }

    let keywordFilter: Prisma.ProjectsEntityWhereInput;
    if (keyword && keyword.length > 0) {
      keywordFilter = {
        OR: [{ title: { contains: keyword } }, { body: { contains: keyword } }],
      };
    }

    if (start === 'null' || !end) {
      start = '0';
    }
    if (end === 'null' || !end) {
      end = '100';
    }

    const progressFilter: Prisma.ProjectsEntityWhereInput = {
      progress: {
        gte: parseInt(start),
        lte: parseInt(end),
      },
    };

    return await this.prisma.projectsEntity.findMany({
      include: {
        hero: true,
        assignee: {
          select: {
            user: {
              select: {
                id: true,
                ...ImageUploaderUtility.genImageEntityArg().user.select,
              },
            },
          },
        },
      },
      orderBy: sortBy,
      where: Object.assign({}, statusFilter, keywordFilter, progressFilter),
    });
  }

  async getProjectByTitle(title: string) {
    return await this.prisma.projectsEntity.findFirst({
      where: {
        title,
      },
    });
  }

  async deleteProjectById(projectId: string) {
    return await this.prisma.projectsEntity.delete({
      where: { id: projectId },
    });
  }

  async getSingle(id: string) {
    return await this.prisma.projectsEntity.findUnique({
      where: {
        id,
      },
      include: {
        assignee: {
          select: ImageUploaderUtility.genImageEntityArg(),
        },
        hero: true,
        summary: {
          include: {
            reporter: ImageUploaderUtility.genImageEntityArg().user,
          },
        },
      },
    });
  }
}
