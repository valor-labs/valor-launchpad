import { TestBed } from '@angular/core/testing';

import { ResetNewPasswordService } from './reset-new-password.service';

describe('ResetNewPasswordService', () => {
  let service: ResetNewPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetNewPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
