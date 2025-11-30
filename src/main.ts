import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });
  const port = process.env.PUBLIC_API_PORT ?? 3000;
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();