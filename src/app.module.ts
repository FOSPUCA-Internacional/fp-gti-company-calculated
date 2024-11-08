import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientCalculatedModule } from './client-calculated/client-calculated.module';
import { ProformasCalculatedModule } from './proformas-calculated/proformas-calculated.module';
import { ClientInfoModule } from './client-proform-info/client-proform-info.module';
import { ApolloModule } from './apollo/apollo.module';
import { CountProformClientsModule } from './count-proform-clients/count-proform-clients.module';

@Module({
  imports: [ClientCalculatedModule, ProformasCalculatedModule, ClientInfoModule, CountProformClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
