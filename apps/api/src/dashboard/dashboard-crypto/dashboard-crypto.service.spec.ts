import { Test, TestingModule } from '@nestjs/testing';
import { DashboardCryptoService } from './dashboard-crypto.service';

describe('DashboardCryptoService', () => {
  let service: DashboardCryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardCryptoService],
    }).compile();

    service = module.get<DashboardCryptoService>(DashboardCryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
