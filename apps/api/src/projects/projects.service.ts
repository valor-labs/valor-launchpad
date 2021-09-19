import {Injectable} from '@nestjs/common';
import {Prisma} from "@prisma/client";
import {EventEmitter2} from '@nestjs/event-emitter'
import {ProjectCreatedFatEvent, ProjectCreatedThinEvent} from './events/project-created.event';
import {PrismaService} from '@valor-launchpad/prisma';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService,
              private eventEmitter: EventEmitter2) {
  }

  async createProject(projectDTO: Prisma.ProjectsEntityCreateInput) {
    const persistedProject: any = this.prisma.projectsEntity.create({
      data: projectDTO
    })

    this.eventEmitter.emit(
      'project.created.thin',
      <ProjectCreatedThinEvent>{
        id: persistedProject.id,
      },
    );
    this.eventEmitter.emit(
      'project.created.fat',
      <ProjectCreatedFatEvent>persistedProject,
    );
    return persistedProject;
  }

  async getAll() {
    return await this.prisma.projectsEntity.findMany({
      include: {
        hero: true
      }
    });
  }

  async getSingle(id: string) {
    return await this.prisma.projectsEntity.findUnique({
      where: {
        id
      },
      include: {
        assignee: {
          include: {
            user: {
              include: {
                profile: true,
                avatar: { select: { src: true, alt: true } },
              }
            }
          }
        },
        hero: true,
        summary: {
          include: {
            reporter: {
              include: {
                profile: true,
                avatar: { select: { src: true, alt: true } },
              }
            }
          }
        },
        comments: {
          include: {
            author: {
              include: {
                profile: true,
                avatar: { select: { src: true, alt: true } },
              }
            },
            children: {
              include: {
                author: {
                  include: {
                    profile: true,
                    avatar: { select: { src: true, alt: true } },
                  }
                }
              }
            }
          }
        }
      }
    });
  }
}
