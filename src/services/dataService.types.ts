import { Request, Response, NextFunction } from 'express';

export interface DataService {
  login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> | void;
  createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> | void;
  getAllDecks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> | void;
  createDeck(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> | void;
  deleteDeck(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> | void;
  createCard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> | void;
  editCard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> | void;
  deleteCard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> | void;
}
