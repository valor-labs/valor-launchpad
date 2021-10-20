import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsDetailService } from './projects-detail.service';
import {
  ProjectDetailVo,
  STATUS_MAPPING,
} from '@valor-launchpad/api-interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'valor-launchpad-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss'],
})
export class ProjectsDetailComponent implements OnInit {
  STATUS_MAPPING = STATUS_MAPPING;
  id: string;
  project: ProjectDetailVo;

  constructor(
    private route: ActivatedRoute,
    private projectDetailService: ProjectsDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // TODO: eventually move this into a resolver or guard
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getProjectDetails(this.id);
    });
  }

  getProjectDetails(id: string) {
    this.projectDetailService.getProjectById(id).subscribe((data) => {
      this.project = data;
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
