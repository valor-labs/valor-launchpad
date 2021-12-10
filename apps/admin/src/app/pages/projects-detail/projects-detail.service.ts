import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { ProjectDetailVo } from '@valor-launchpad/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectsDetailService {
  private apiBase = this.config.environment.apiBase;
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getProjectById(id: string) {
    return this.httpClient.get<ProjectDetailVo>(
      this.config.environment.apiBase + `api/projects/v1/single/${id}`
    );
  }

  getProjectComments(id: string) {
    return this.httpClient.get(
      this.config.environment.apiBase + `api/projects/v1/${id}/comments`
    );
  }

  createComment(projectId: string, comment: unknown) {
    return this.httpClient.post(
      `${this.apiBase}api/projects/v1/${projectId}/comments`,
      comment
    );
  }

  deleteComment(projectId: string, commentId: string) {
    return this.httpClient.delete(
      `${this.apiBase}api/projects/v1/${projectId}/comments/${commentId}`
    );
  }

  likeComment(commentId: string) {
    return this.httpClient.post(
      `${this.apiBase}api/projects/v1/comments/${commentId}/like`,
      {}
    );
  }

  unlikeComment(commentId: string) {
    return this.httpClient.delete(
      `${this.apiBase}api/projects/v1/comments/${commentId}/like`
    );
  }
}
