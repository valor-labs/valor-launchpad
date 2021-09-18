import { Test, TestingModule } from '@nestjs/testing';
import { DashboardSocialController } from './dashboard-social.controller';

describe('DashboardSocialController', () => {
  let controller: DashboardSocialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardSocialController],
    }).compile();

    controller = module.get<DashboardSocialController>(
      DashboardSocialController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
