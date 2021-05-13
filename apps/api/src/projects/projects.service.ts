import {Injectable} from '@nestjs/common';
import {ProjectsEntity} from "./projects.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectsEntity)
              private projectsRepository: Repository<ProjectsEntity>) {
  }

  async getAll() {
    return await this.projectsRepository.find();
  }

  async getSingle(id: string) {
    return await this.projectsRepository.findOne({where: {id},relations: ["comments"]})
  }
}
