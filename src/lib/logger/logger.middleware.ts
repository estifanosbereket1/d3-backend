import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('Response');
    constructor() { }

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl: url, body, query, params } = req;
        const userAgent = req.get('user-agent') || 'Unknown';
        const ip = req.ip || req.socket.remoteAddress || 'Unknown';
        const requestTime = new Date().getTime();

        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length') || '0';
            const responseTime = new Date().getTime() - requestTime;

            this.logger.log(
                `${method} ${url} ${statusCode} ${contentLength} - ${responseTime}ms - IP: ${ip} - Body: ${JSON.stringify(body)} - Query: ${JSON.stringify(query)} - Params: ${JSON.stringify(params)}`,
            );
        });

        next();
    }
}