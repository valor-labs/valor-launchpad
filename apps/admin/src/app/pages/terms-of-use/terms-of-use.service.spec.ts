import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { TermsOfUseService } from './terms-of-use.service';
import { HttpModule } from '@valor-launchpad/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TermsOfUseService', () => {
  let service: TermsOfUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule.forRoot({ environment }), HttpClientTestingModule],
    });
    service = TestBed.inject(TermsOfUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
