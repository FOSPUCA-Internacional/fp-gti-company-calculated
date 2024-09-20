import { Module } from '@nestjs/common';
import { ClientInfoService } from './client-proform-info.service';
import { ClientInfoController } from './client-proform-info.controller';

@Module({
  controllers: [ClientInfoController],
  providers: [ClientInfoService],
})
export class ClientCalculatedModule {}
