import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../../environments/environment';
import { SettingsTermsOfUseService } from './settings-terms-of-use.service';

describe('SettingsTermsOfUseService', () => {
  let service: SettingsTermsOfUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule.forRoot({ environment })],
    });
    service = TestBed.inject(SettingsTermsOfUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
