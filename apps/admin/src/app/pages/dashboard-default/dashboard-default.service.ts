import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardDefaultService {
  constructor(private httpClient: HttpClient) {
  }

  getData() {
    return this.httpClient.get(`/api/dashboard/v1/all`)
  }
}
