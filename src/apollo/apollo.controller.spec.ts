import { Test, TestingModule } from '@nestjs/testing';
import { ApolloController } from './apollo.controller';
import { ApolloService } from './apollo.service';

describe('ApolloController', () => {
  let controller: ApolloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApolloController],
      providers: [ApolloService],
    }).compile();

    controller = module.get<ApolloController>(ApolloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
