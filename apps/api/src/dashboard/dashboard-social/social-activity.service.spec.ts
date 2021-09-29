import { Test, TestingModule } from '@nestjs/testing';
import { SocialActivityService } from './social-activity.service';

describe('SocialActivityService', () => {
  let service: SocialActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialActivityService],
    }).compile();

    service = module.get<SocialActivityService>(SocialActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
