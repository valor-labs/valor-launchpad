import { TestBed } from '@angular/core/testing';

import { DashboardCryptoService } from './dashboard-crypto.service';

describe('DashboardCryptoService', () => {
  let service: DashboardCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
