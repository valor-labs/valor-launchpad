import {Injectable} from '@nestjs/common';
import {ProjectsEntity} from "./projects.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {EventEmitter2} from '@nestjs/event-emitter'
import {ProjectCreatedEvent} from './events/project-created.event';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectsEntity)
              private projectsRepository: Repository<ProjectsEntity>,
              private eventEmitter: EventEmitter2) {
  }

  async createProject(projectDTO) {
    const persistedProject = await this.projectsRepository.save(projectDTO)
    this.eventEmitter.emit(
      'project.created',
      <ProjectCreatedEvent>{
        id: persistedProject.id,
      } ,
    );
    return persistedProject;
  }

  async getAll() {
    return await this.projectsRepository.find();
  }

  async getSingle(id: string) {
    return await this.projectsRepository.findOne({where: {id}, relations: ["comments", "comments.children"]})
  }
}
