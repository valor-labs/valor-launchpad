import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectsListService {

  constructor(private httpClient: HttpClient) {
  }

  getProjects() {
    return this.httpClient.get('/api/projects/all')
  }
}
