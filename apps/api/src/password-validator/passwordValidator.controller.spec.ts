import { Test, TestingModule } from '@nestjs/testing';
import { PasswordValidatorController } from './passwordValidator.controller';

describe('PasswordValidatorController', () => {
  let controller: PasswordValidatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordValidatorController],
    }).compile();

    controller = module.get<PasswordValidatorController>(
      PasswordValidatorController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
