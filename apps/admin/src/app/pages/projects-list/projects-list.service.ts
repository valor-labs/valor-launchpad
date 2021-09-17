import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ENV_CONFIG, EnvironmentConfig} from '../../core/http/environment-config.interface';
import { Observable } from 'rxjs';
import { Project } from '@api/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsListService {

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private httpClient: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.config.environment.apiBase + 'api/projects/v1/all')
  }
}
