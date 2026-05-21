import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const logger = pino();

interface AuthRequest extends Request {
  userId?: string;
  isAdmin?: boolean;
}

export const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Missing authorization token' });
    }

    // TODO: Verify JWT token
    // For now, extract userId from token
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    req.userId = decoded.sub;
    req.isAdmin = decoded.isAdmin || false;

    next();
  } catch (error) {
    logger.error('JWT verification failed', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
