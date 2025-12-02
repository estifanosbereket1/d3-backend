import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { mapValidationError } from './common/utils/validator';
import { methods } from 'better-auth/client';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });
  const port = process.env.PUBLIC_API_PORT ?? 3000;
  app.enableCors({

    origin: ['http://localhost:3000', 'http://localhost:3001', "https://d3-client.vercel.app", "https://d3.beete-nibab.com", "https://front.beete-nibab.com/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('D3 backend')
    .setDescription('Shared Workspace API')
    .setVersion('1.0')
    .addTag('d3').addServer('/')
    .addCookieAuth().addApiKey(
      {
        type: 'apiKey',
        name: 'x-organization-id',
        in: 'header',
      },
      'x-organization-id',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const mappedErrors = mapValidationError(errors);
        return new BadRequestException({
          message: 'Bad Request',
          errors: mappedErrors,
          statusCode: 400,
        });
      },
    }),
  );
  // app.setGlobalPrefix('api/v1');
  await app.listen(port);
}
bootstrap();