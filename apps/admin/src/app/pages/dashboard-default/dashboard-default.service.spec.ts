import { TestBed } from '@angular/core/testing';

import { DashboardDefaultService } from './dashboard-default.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';

describe('DashboardDefaultService', () => {
  let service: DashboardDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule.forRoot({ environment })],
    });
    service = TestBed.inject(DashboardDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
