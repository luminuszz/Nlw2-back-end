import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(3333);
}
bootstrap();
