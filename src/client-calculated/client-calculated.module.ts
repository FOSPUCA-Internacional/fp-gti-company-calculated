import { Module } from '@nestjs/common';
import { ClientCalculatedService } from './client-calculated.service';
import { ClientCalculatedController } from './client-calculated.controller';

@Module({
  controllers: [ClientCalculatedController],
  providers: [ClientCalculatedService],
})
export class ClientCalculatedModule {}
