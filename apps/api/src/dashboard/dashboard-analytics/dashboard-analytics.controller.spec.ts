import { Test, TestingModule } from '@nestjs/testing';
import { DashboardAnalyticsController } from './dashboard-analytics.controller';

describe('DashboardAnalyticsController', () => {
  let controller: DashboardAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardAnalyticsController],
    }).compile();

    controller = module.get<DashboardAnalyticsController>(
      DashboardAnalyticsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
