import { Test, TestingModule } from '@nestjs/testing';
import { CountProformClientsController } from './count-proform-clients.controller';
import { CountProformClientsService } from './count-proform-clients.service';

describe('CountProformClientsController', () => {
  let controller: CountProformClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountProformClientsController],
      providers: [CountProformClientsService],
    }).compile();

    controller = module.get<CountProformClientsController>(CountProformClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
