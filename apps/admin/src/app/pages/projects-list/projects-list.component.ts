import {Component, OnInit} from '@angular/core';
import {ProjectsListService} from "./projects-list.service";

@Component({
  selector: 'valor-launchpad-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects = [];

  constructor(private projectsListService: ProjectsListService) {
    projectsListService.getProjects().subscribe((data) => {
      this.projects = <[]>data
    })
  }

  ngOnInit(): void {

  }

}
