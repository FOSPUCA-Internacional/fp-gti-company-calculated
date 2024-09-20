import { Test, TestingModule } from '@nestjs/testing';
import { ClientCalculatedService } from './client-calculated.service';

describe('ClientCalculatedService', () => {
  let service: ClientCalculatedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientCalculatedService],
    }).compile();

    service = module.get<ClientCalculatedService>(ClientCalculatedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
