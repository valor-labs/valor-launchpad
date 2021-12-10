import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ProjectsListener {
  private readonly logger = new Logger(ProjectsListener.name);

  @OnEvent('project.created.thin', { async: true })
  handleProjectCreatedEventThin(event) {
    this.logger.log(`Event: ${event.id} was successfully created`);
  }

  @OnEvent('project.created.fat', { async: true })
  handleProjectCreatedEventFat(event) {
    this.logger.log(
      `Event: ${event.id} was successfully created with body \n ${event.body}`
    );
  }
}
