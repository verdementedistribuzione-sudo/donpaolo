import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const logger = pino();

interface ApiError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error({
    error: message,
    status,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  res.status(status).json({
    error: message,
    status,
    timestamp: new Date().toISOString(),
  });
};
