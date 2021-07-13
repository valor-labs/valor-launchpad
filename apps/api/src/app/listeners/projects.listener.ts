import {Injectable, Logger} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {ProjectCreatedEvent} from '../../projects/events/project-created.event';

@Injectable()
export class ProjectsListener {
  private readonly logger = new Logger(ProjectsListener.name);

  @OnEvent('project.created',{ async: true })
  handleProjectCreatedEvent(event: ProjectCreatedEvent) {
    this.logger.log(`Event: ${event.id} was successfully created`)
  }
}
