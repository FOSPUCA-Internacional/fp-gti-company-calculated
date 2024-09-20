import { Test, TestingModule } from '@nestjs/testing';
import { ClientCalculatedController } from './client-calculated.controller';
import { ClientCalculatedService } from './client-calculated.service';

describe('ClientCalculatedController', () => {
  let controller: ClientCalculatedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientCalculatedController],
      providers: [ClientCalculatedService],
    }).compile();

    controller = module.get<ClientCalculatedController>(ClientCalculatedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
