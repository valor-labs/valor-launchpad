import { TestBed } from '@angular/core/testing';

import { ValorThemeService } from './valor-theme.service';

describe('ValorThemeService', () => {
  let service: ValorThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValorThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
