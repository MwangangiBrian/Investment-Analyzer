import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserOutput } from '../types/user.types';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserOutput;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};