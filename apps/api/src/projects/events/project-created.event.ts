import { ProjectsEntity } from '../projects.entity';

export class ProjectCreatedThinEvent {
  id: string;
}

export class ProjectCreatedFatEvent extends ProjectsEntity {}
