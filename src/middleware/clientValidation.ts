import { Request, Response, NextFunction } from 'express';
import JoiValidator from '../services/joiValidation/validation';
import { ValidationError } from '@hapi/joi';

function validatedResponse(
  error: ValidationError,
  res: Response,
  next: NextFunction
) {
  console.log('clientValidation', error);
  return !error ? next() : res.status(400).send(error.details[0].message);
}

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { error } = JoiValidator.validateLogin(req.body);
  return validatedResponse(error, res, next);
}

function validateFlashcard(req: Request, res: Response, next: NextFunction) {
  const { error } = JoiValidator.validateFlashcard(req.body.card || req.body);
  return validatedResponse(error, res, next);
}

function validateDeckName(req: Request, res: Response, next: NextFunction) {
  const { error } = JoiValidator.validateDeckName(req.body.deckName);
  return validatedResponse(error, res, next);
}

function validateUser(req: Request, res: Response, next: NextFunction) {
  const { error } = JoiValidator.validateUser(req.body);
  return validatedResponse(error, res, next);
}

export { validateUser, validateDeckName, validateFlashcard, validateLogin };
