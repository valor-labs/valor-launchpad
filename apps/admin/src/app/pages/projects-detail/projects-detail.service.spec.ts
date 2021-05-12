import { TestBed } from '@angular/core/testing';

import { ProjectsDetailService } from './projects-detail.service';

describe('ProjectsDetailService', () => {
  let service: ProjectsDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
