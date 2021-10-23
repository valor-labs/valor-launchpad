import { TestBed } from '@angular/core/testing';

import { DashboardSocialService } from './dashboard-social.service';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardSocialService', () => {
  let service: DashboardSocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule.forRoot({ environment }), HttpClientTestingModule],
    });
    service = TestBed.inject(DashboardSocialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
