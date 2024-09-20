import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientCalculatedModule } from './client-calculated/client-calculated.module';
import { ProformasCalculatedModule } from './proformas-calculated/proformas-calculated.module';
import { ApolloModule } from './apollo/apollo.module';

@Module({
  imports: [ClientCalculatedModule, ProformasCalculatedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
