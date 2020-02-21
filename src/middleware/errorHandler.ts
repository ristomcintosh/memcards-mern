import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import ClientError from '../utils/clientError';

export default function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ClientError) {
    const error = (err as unknown) as ClientError;
    return res.status(404).send(error.message);
  }

  console.log(err);
  return res.status(500).send(err);
}
