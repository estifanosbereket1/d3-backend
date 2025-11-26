import { Module } from '@nestjs/common';

import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth/auth';

@Module({
  imports: [
    AuthModule.forRoot(auth)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
