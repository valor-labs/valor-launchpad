import { TestBed } from '@angular/core/testing';

import { DashboardSocialService } from './dashboard-social.service';

describe('DashboardSocialService', () => {
  let service: DashboardSocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardSocialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
