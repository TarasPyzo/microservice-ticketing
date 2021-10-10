import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { load } from 'ts-dotenv';

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

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      load({ JWT_SECRET: String }).JWT_SECRET,
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
