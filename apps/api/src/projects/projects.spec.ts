import { Test, TestingModule } from '@nestjs/testing';
import { Projects } from './projects';

describe('Projects', () => {
  let provider: Projects;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Projects],
    }).compile();

    provider = module.get<Projects>(Projects);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
