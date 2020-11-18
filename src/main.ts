import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
    maxAge: 3600
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
