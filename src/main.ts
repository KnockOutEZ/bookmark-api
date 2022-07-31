/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global scoped pipe. and stricting fields
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }));
  await app.listen(process.env.PORT);
}
bootstrap();
