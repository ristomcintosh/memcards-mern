import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

require('dotenv').config();

export default function Auth(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.webToken;
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    res.locals.user = decoded;
    return next();
  } catch (ex) {
    return res.status(400).send('Invalid token.');
  }
}
