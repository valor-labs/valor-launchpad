import { Test } from '@nestjs/testing';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';

describe('SmsController', () => {
  let controller: SmsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SmsService],
      controllers: [SmsController],
    }).compile();

    controller = module.get(SmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
