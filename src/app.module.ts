import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientCalculatedModule } from './client-calculated/client-calculated.module';
import { ProformasCalculatedModule } from './proformas-calculated/proformas-calculated.module';
import { ClientInfoModule } from './client-proform-info/client-proform-info.module';
import { ApolloModule } from './apollo/apollo.module';
import { CountProformClientsModule } from './count-proform-clients/count-proform-clients.module';
import { ClientInformationModule } from './client-information/client-information.module';
import { ClientModule } from './client/client.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [ClientCalculatedModule, ProformasCalculatedModule, ClientInfoModule, CountProformClientsModule, ClientInformationModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}

