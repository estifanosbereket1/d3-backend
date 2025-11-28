import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth/auth';
import { LoggerMiddleware } from './lib/logger/logger.middleware';
import { OutlineModule } from './outline/outline.module';
import { clsModule } from './config/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule.forRoot(auth),
    OutlineModule,
    DatabaseModule,
    clsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
