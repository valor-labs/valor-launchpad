import { Test, TestingModule } from '@nestjs/testing';
import { DashboardAnalyticsService } from './dashboard-analytics.service';

describe('DashboardAnalyticsService', () => {
  let service: DashboardAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardAnalyticsService],
    }).compile();

    service = module.get<DashboardAnalyticsService>(DashboardAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
