import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ProjectCreatedFatEvent,
  ProjectCreatedThinEvent,
} from '../../projects/events/project-created.event';

@Injectable()
export class ProjectsListener {
  private readonly logger = new Logger(ProjectsListener.name);

  @OnEvent('project.created.thin', { async: true })
  handleProjectCreatedEventThin(event: ProjectCreatedThinEvent) {
    this.logger.log(`Event: ${event.id} was successfully created`);
  }

  @OnEvent('project.created.fat', { async: true })
  handleProjectCreatedEventFat(event: ProjectCreatedFatEvent) {
    this.logger.log(
      `Event: ${event.id} was successfully created with body \n ${event.body}`
    );
  }
}
