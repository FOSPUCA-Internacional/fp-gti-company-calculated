import { Module } from '@nestjs/common';
import { ApolloService } from './apollo.service';
import { ApolloController } from './apollo.controller';
import { ApolloClient, InMemoryCache } from '@apollo/client';

@Module({
  controllers: [ApolloController],
  providers: [{
    provide: 'ApolloClient',
    useValue: new ApolloClient({
      uri: 'http://localhost:4000/graphql', 
      cache: new InMemoryCache(),
    }),
  }],
  exports: ['ApolloClient'],
})
export class ApolloModule {}
