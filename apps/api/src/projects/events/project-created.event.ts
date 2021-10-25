import { ProjectsEntity } from '@valor-launchpad/common-api';

export class ProjectCreatedThinEvent {
  id: string;
}

export class ProjectCreatedFatEvent extends ProjectsEntity {}
