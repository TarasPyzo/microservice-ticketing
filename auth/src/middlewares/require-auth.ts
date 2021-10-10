import { Request, Response, NextFunction } from 'express';

import { NotAuthError } from '../errors/not-auth-error';

interface UserPayload {
  _id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthError();
  }

  next();
};
