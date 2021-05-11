import { TestBed } from '@angular/core/testing';

import { ProjectsListService } from './projects-list.service';

describe('ProjectsListService', () => {
  let service: ProjectsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
