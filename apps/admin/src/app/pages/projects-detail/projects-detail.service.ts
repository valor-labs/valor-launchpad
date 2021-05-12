import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectsDetailService {

  constructor(private httpClient: HttpClient) {
  }

  getProjectById(id:string) {
    return this.httpClient.get(`/api/projects/single/${id}`)
  }
}
