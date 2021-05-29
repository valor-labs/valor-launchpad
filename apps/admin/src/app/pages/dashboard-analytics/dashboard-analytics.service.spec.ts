import { TestBed } from '@angular/core/testing';

import { DashboardAnalyticsService } from './dashboard-analytics.service';

describe('DashboardAnalyticsService', () => {
  let service: DashboardAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
