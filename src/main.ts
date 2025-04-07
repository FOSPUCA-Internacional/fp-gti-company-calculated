import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['*'],
    //origin: ['http://localhost:3001', 'http://10.160.10.37:4051'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  });

  await app.listen(4008);
}
bootstrap();
