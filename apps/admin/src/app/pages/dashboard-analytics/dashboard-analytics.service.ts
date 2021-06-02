import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardAnalyticsService {

  constructor(private httpClient: HttpClient) {
  }



  getData() {
    return this.httpClient.get(`/api/dashboard-analytics/v1/all`)
  }
}
