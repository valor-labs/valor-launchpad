import { Test, TestingModule } from '@nestjs/testing';
import { PasswordValidatorService } from './passwordValidator.service';

describe('PasswordValidatorService', () => {
  let service: PasswordValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordValidatorService],
    }).compile();

    service = module.get<PasswordValidatorService>(PasswordValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
