import { Test, TestingModule } from '@nestjs/testing';
import { SocketConnService } from './socket-conn.service';

describe('SocketConnService', () => {
  let service: SocketConnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketConnService],
    }).compile();

    service = module.get<SocketConnService>(SocketConnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
