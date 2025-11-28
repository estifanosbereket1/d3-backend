import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { forwardRef } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

export const clsModule = ClsModule.forRoot({
    plugins: [
        new ClsPluginTransactional({
            imports: [DatabaseModule],
            adapter: new TransactionalAdapterPrisma({
                prismaInjectionToken: DatabaseService,
            }),
        }),
    ],
});