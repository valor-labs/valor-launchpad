import { Test, TestingModule } from '@nestjs/testing';
import { DashboardSocialService } from './dashboard-social.service';

describe('DashboardSocialService', () => {
  let service: DashboardSocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardSocialService],
    }).compile();

    service = module.get<DashboardSocialService>(DashboardSocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
