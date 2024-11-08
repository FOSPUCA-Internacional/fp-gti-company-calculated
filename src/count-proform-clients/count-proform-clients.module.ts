import { Module } from '@nestjs/common';
import { CountProformClientsService } from './count-proform-clients.service';
import { CountProformClientsController } from './count-proform-clients.controller';

@Module({
  controllers: [CountProformClientsController],
  providers: [CountProformClientsService],
})
export class CountProformClientsModule {}
