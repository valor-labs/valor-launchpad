import { Component, HostBinding, Input } from '@angular/core';
import {
  ProjectListItemVo,
  STATUS_MAPPING,
} from '@valor-launchpad/api-interfaces';

@Component({
  selector: 'valor-launchpad-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss'],
})
export class ProjectListItemComponent {
  STATUS_MAPPING = STATUS_MAPPING;
  @HostBinding('class')
  class = 'col-12 col-md-6 col-lg-3';

  @Input()
  config: ProjectListItemVo;

  deleteProject() {
    //todo: make this meaningful
    console.log(`action fired for card: delete`);
  }

  cloneProject() {
    //todo: make this meaningful
    console.log(`action fired for card: clone`);
  }
}
