import { TestBed } from '@angular/core/testing';

import { VerifyUserService } from './verify-user.service';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiModule } from '@valor-launchpad/ui';

describe('VerifyUserService', () => {
  let service: VerifyUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({ environment }),
        HttpClientTestingModule,
        UiModule,
      ],
    });
    service = TestBed.inject(VerifyUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
