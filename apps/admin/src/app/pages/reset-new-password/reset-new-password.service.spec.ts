import { TestBed } from '@angular/core/testing';

import { ResetNewPasswordService } from './reset-new-password.service';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResetNewPasswordService', () => {
  let service: ResetNewPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule.forRoot({ environment }), HttpClientTestingModule],
    });
    service = TestBed.inject(ResetNewPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
