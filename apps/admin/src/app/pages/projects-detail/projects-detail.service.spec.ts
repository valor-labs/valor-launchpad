import { TestBed } from '@angular/core/testing';

import { ProjectsDetailService } from './projects-detail.service';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectsDetailService', () => {
  let service: ProjectsDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule.forRoot({ environment }), HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectsDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
