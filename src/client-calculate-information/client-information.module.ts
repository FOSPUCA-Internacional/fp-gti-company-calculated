import { Module } from '@nestjs/common';
import { ClientInformationService } from './client-information.service';
import { ClientInformationController } from './client-information.controller';

@Module({
  controllers: [ClientInformationController],
  providers: [ClientInformationService],
})
export class ClientInformationModule {}
