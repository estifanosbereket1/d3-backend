import { Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export class DatabaseService extends PrismaClient implements OnModuleInit {
    logger = new Logger()
    async onModuleInit() {
        await this.$connect()
    }

    async checkConnection() {
        try {
            await this.$connect();
            await this.$disconnect();
            return true;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }


}