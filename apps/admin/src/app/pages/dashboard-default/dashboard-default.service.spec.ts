import { TestBed } from '@angular/core/testing';

import { DashboardDefaultService } from './dashboard-default.service';

describe('DashboardDefaultService', () => {
  let service: DashboardDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
