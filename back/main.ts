import { NestFactory } from '@nestjs/core'
import { AppModule } from './src/application/module/app.module'
import 'reflect-metadata';

async function startApp() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3101', 'http://localhost:3102'],
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD'],
      exposedHeaders: ['Content-Range'],
    },
  });
  await app.listen(3100);
}

startApp()
