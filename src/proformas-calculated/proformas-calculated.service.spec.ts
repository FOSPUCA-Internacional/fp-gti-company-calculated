import { Test, TestingModule } from '@nestjs/testing';
import { ProformasCalculatedService } from './proformas-calculated.service';

describe('ProformasCalculatedService', () => {
  let service: ProformasCalculatedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProformasCalculatedService],
    }).compile();

    service = module.get<ProformasCalculatedService>(ProformasCalculatedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
