import {Component, OnInit} from '@angular/core';
import {ProjectsListService} from "./projects-list.service";
// TODO: find a better place for these and refactor them to be cleaner
import {Project} from "../../../../../api/src/projects/Project.class";

@Component({
  selector: 'valor-launchpad-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Array<Project> = [];

  constructor(private projectsListService: ProjectsListService) {
    projectsListService.getProjects().subscribe((data: Array<Project>) => {
      this.projects = data
    })
  }

  ngOnInit(): void {

  }

}
