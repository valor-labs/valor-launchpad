import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectsDetailService} from "./projects-detail.service";
import {ProjectDetail} from "@api/projects";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'valor-launchpad-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss']
})
export class ProjectsDetailComponent implements OnInit {
  id: string;
  project: ProjectDetail;

  constructor(private route: ActivatedRoute,
              private projectDetailService: ProjectsDetailService,
              private toastr: ToastrService
              ) {
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


  onClickAction(): void {
    this.toastr.success('Action!', 'You Click the Action!');
  }

  onClickAnotherAction(): void {
    alert('You Click the Another Action!');
  }

  onClickSomethingElse(): void {
    console.log('You click the something else');
  }
}
