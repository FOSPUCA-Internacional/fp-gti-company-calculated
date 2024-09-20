import { Module } from '@nestjs/common';
import { ProformasCalculatedService } from './proformas-calculated.service';
import { ProformasCalculatedController } from './proformas-calculated.controller';

@Module({
  controllers: [ProformasCalculatedController],
  providers: [ProformasCalculatedService],
})
export class ProformasCalculatedModule {}
