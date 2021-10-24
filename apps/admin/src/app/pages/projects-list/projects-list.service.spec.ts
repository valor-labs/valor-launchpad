import { TestBed } from '@angular/core/testing';

import { ProjectsListService } from './projects-list.service';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectsListService', () => {
  let service: ProjectsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule.forRoot({ environment }), HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
