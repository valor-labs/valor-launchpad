import { TestBed } from '@angular/core/testing';

import { DashboardAnalyticsService } from './dashboard-analytics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';

describe('DashboardAnalyticsService', () => {
  let service: DashboardAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule.forRoot({ environment })],
    });
    service = TestBed.inject(DashboardAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
