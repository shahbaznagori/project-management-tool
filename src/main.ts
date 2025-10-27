import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/Response.interceptor';
import * as dotenv from 'dotenv';


  dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
