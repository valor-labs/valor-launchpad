import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectsDetailService} from "./projects-detail.service";
import {ProjectDetail} from "@api/projects";

@Component({
  selector: 'valor-launchpad-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss']
})
export class ProjectsDetailComponent implements OnInit {
  id: string;
  project: ProjectDetail;

  constructor(private route: ActivatedRoute, private projectDetailService: ProjectsDetailService) {
  }

  ngOnInit(): void {
    // TODO: eventually move this into a resolver or guard
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getProjectDetails(this.id)
    });
  }

  getProjectDetails(id: string) {
    this.projectDetailService.getProjectById(id).subscribe((data) => {
      this.project = <ProjectDetail>data;
    });
  }
}
