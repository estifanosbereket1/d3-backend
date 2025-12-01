import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });
  const port = process.env.PUBLIC_API_PORT ?? 3000;
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', "https://d3-client.vercel.app", "https://d3.beete-nibab.com"],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('D3 backend')
    .setDescription('Shared Workspace API')
    .setVersion('1.0')
    .addTag('d3')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory)
  await app.listen(port);
}
bootstrap();