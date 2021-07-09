import { Test } from '@nestjs/testing';
import { SmsService } from './sms.service';

describe('SmsService', () => {
  let service: SmsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SmsService],
    }).compile();

    service = module.get(SmsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
