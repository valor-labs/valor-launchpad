import {Injectable} from '@nestjs/common';
import {Prisma} from "@prisma/client";
import {EventEmitter2} from '@nestjs/event-emitter'
import {ProjectCreatedFatEvent, ProjectCreatedThinEvent} from './events/project-created.event';
import {PrismaService} from '@valor-launchpad/prisma';
import { Project } from '@api/projects';
import { v4 as uuidv4 } from 'uuid';
import * as Faker from 'faker';
@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService,
              private eventEmitter: EventEmitter2) {
  }

  async createProject(projectDTO: Project) {
    const uuid = uuidv4();
    const src = Faker.image.imageUrl(null, null, null, true);
    const persistedProject: any = this.prisma.projectsEntity.create({
      data: {
        id: uuid,
        hero: {
          connectOrCreate: {
            where: {
              project_alt_unique_constraint: {
                project_id: uuid,
                alt: projectDTO.hero.alt
              }
            },
            create: {
              type: 'image',
              src: src,
              alt: projectDTO.hero.alt
            }
          }
        },
        title: projectDTO.title,
        body: projectDTO.body,
        progress: projectDTO.progress,
        badge: {
          title: projectDTO.badge.title,
          status: projectDTO.badge.status,
        },
        actions: projectDTO.actions
      }
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

  async getProjectByTitle(title: string) {
    return await this.prisma.projectsEntity.findFirst({
      where: {
        title
      }
    })
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
