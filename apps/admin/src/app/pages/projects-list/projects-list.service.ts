import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ENV_CONFIG,
  EnvironmentConfig,
} from '../../core/http/environment-config.interface';
import { Observable } from 'rxjs';
import { ProjectListItemVo } from '@valor-launchpad/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectsListService {
  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getProjects() {
    return this.httpClient.get<ProjectListItemVo[]>(
      this.config.environment.apiBase + 'api/projects/v1/all'
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
    return this.httpClient.post<ProjectListItemVo>(
      this.config.environment.apiBase + 'api/projects/v1/create',
      formData
    );
  }
}
