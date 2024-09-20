import { Test, TestingModule } from '@nestjs/testing';
import { ProformasCalculatedController } from './proformas-calculated.controller';
import { ProformasCalculatedService } from './proformas-calculated.service';

describe('ProformasCalculatedController', () => {
  let controller: ProformasCalculatedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProformasCalculatedController],
      providers: [ProformasCalculatedService],
    }).compile();

    controller = module.get<ProformasCalculatedController>(ProformasCalculatedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
