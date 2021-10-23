import { TestBed } from '@angular/core/testing';
import { DashboardCryptoService } from './dashboard-crypto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpModule } from '@valor-launchpad/http';
import { environment } from '../../../environments/environment';

describe('DashboardCryptoService', () => {
  let service: DashboardCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule.forRoot({ environment })],
    });
    service = TestBed.inject(DashboardCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
