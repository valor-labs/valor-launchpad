import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { Observable } from 'rxjs';
import { ProjectListItemVo } from '@valor-launchpad/api-interfaces';
import { Progress } from './projects-list.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectsListService {
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getProjects(
    sortBy?: string,
    search?: string,
    status?: string[],
    progress?: Progress
  ) {
    let httpParams = new HttpParams();
    if (sortBy) {
      httpParams = httpParams.append('sort', sortBy);
    }
    if (Array.isArray(status) && status.length > 0) {
      httpParams = httpParams.append('status', status.join(','));
    }
    if (progress) {
      httpParams = httpParams.append('start', progress?.start);
      httpParams = httpParams.append('end', progress?.end);
    }
    if (typeof search === 'string' && search.trim().length > 0) {
      httpParams = httpParams.append('keyword', search);
    }

    return this.httpClient.get<ProjectListItemVo[]>(
      this.config.environment.apiBase + 'api/projects/v1/all',
      {
        params: httpParams,
      }
    );
  }

  isNameExists(name: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.config.environment.apiBase + 'api/projects/v1/isProjectExist/' + name
    );
  }

  createProject(project, file: File) {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('body', project.body);
    formData.append('progress', project.progress);
    formData.append('status', project.status);
    formData.append('image', file);
    formData.append('deletable', project.deletable);
    formData.append('cloneable', project.cloneable);
    formData.append('assignee', JSON.stringify(project.assignee));
    return this.httpClient.post<ProjectListItemVo>(
      this.config.environment.apiBase + 'api/projects/v1/create',
      formData
    );
  }

  deleteProject(projectId) {
    return this.httpClient.delete(
      `${this.config.environment.apiBase}api/projects/v1/${projectId}`
    );
  }
}
