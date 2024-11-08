import { Test, TestingModule } from '@nestjs/testing';
import { CountProformClientsService } from './count-proform-clients.service';

describe('CountProformClientsService', () => {
  let service: CountProformClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountProformClientsService],
    }).compile();

    service = module.get<CountProformClientsService>(CountProformClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
