import { Test, TestingModule } from '@nestjs/testing';
import { DashboardCryptoController } from './dashboard-crypto.controller';

describe('DashboardCryptoController', () => {
  let controller: DashboardCryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardCryptoController],
    }).compile();

    controller = module.get<DashboardCryptoController>(
      DashboardCryptoController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
