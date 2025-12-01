import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth/auth';
import { LoggerMiddleware } from './lib/logger/logger.middleware';
import { OutlineModule } from './outline/outline.module';
import { clsModule } from './config/config';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { ResendModule } from 'nestjs-resend';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MailerModule } from 'nestjs-mailer';


@Module({
  imports: [
    AuthModule.forRoot(auth),
    OutlineModule,
    DatabaseModule,
    clsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ResendModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('resend_api_key'),
      }),
      inject: [ConfigService],
    }),

  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: 'APP_GUARD',
  //     useClass: AuthGuard
  //   }
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
