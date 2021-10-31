import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsDetailService } from './projects-detail.service';
import {
  ProjectDetailVo,
  STATUS_MAPPING,
} from '@valor-launchpad/api-interfaces';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { NgModel } from '@angular/forms';
import { CommentListComponent } from '@valor-launchpad/ui';

@Component({
  selector: 'valor-launchpad-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss'],
})
export class ProjectsDetailComponent implements OnInit {
  STATUS_MAPPING = STATUS_MAPPING;
  id: string;
  project: ProjectDetailVo;
  comments;
  creatingComment = false;

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
      this.getProjectComments(this.id);
    });
  }

  getProjectDetails(id: string) {
    this.projectDetailService.getProjectById(id).subscribe((data) => {
      this.project = data;
    });
  }

  getProjectComments(id: string) {
    this.projectDetailService.getProjectComments(id).subscribe((data) => {
      this.comments = data;
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

  onCreateComment(
    bodyControl: NgModel,
    commentListComponent: CommentListComponent
  ) {
    const body = bodyControl.value;
    const comment = commentListComponent.replyingComment;
    of(comment)
      .pipe(
        tap(() => (this.creatingComment = true)),
        switchMap((comment) => {
          const payload: Record<string, unknown> = { body };
          if (comment) {
            payload.commentId = comment.id;
          }
          return this.projectDetailService.createComment(
            this.project.id,
            payload
          );
        }),
        finalize(() => (this.creatingComment = false))
      )
      .subscribe(() => {
        commentListComponent.resetReply(false);
        bodyControl.reset();
        this.getProjectComments(this.id);
      });
  }

  onLikeComment(commentId: string) {
    this.projectDetailService.likeComment(commentId).subscribe(() => {
      this.getProjectComments(this.project.id);
    });
  }

  onUnlikeComment(commentId: string) {
    this.projectDetailService.unlikeComment(commentId).subscribe(() => {
      this.getProjectComments(this.project.id);
    });
  }

  onDeleteComment(commentId: string) {
    this.projectDetailService
      .deleteComment(this.project.id, commentId)
      .subscribe(() => {
        this.getProjectComments(this.project.id);
      });
  }
}
