import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress;
    const port = req.socket.remotePort;
    console.log(`Solicitud desde IP: ${ip}, Puerto: ${port}`);
    next();
  }
}