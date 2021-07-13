import {Injectable} from '@nestjs/common';
import {ProjectsEntity} from "./projects.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {EventEmitter2} from '@nestjs/event-emitter'
import {ProjectCreatedFatEvent, ProjectCreatedThinEvent} from './events/project-created.event';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectsEntity)
              private projectsRepository: Repository<ProjectsEntity>,
              private eventEmitter: EventEmitter2) {
  }

  async createProject(projectDTO) {
    const persistedProject = await this.projectsRepository.save(projectDTO)
    this.eventEmitter.emit(
      'project.created.thin',
      <ProjectCreatedThinEvent>{
        id: persistedProject.id,
      } ,
    );
    this.eventEmitter.emit(
      'project.created.fat',
      <ProjectCreatedFatEvent>persistedProject,
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
