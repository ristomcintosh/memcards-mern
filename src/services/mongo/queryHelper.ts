import { NextFunction } from 'express';
import ClientError from '../../utils/clientError';
import { User } from './models/user.model';
import { Deck } from './models/deck.model';
import { Flashcard } from './models/flashcard.model';

export default class UserQueryHelper {
  private user: User;

  next: NextFunction;

  deck: Deck | undefined;

  card: Flashcard | undefined;

  constructor(user: User, next: NextFunction) {
    this.user = user;
    this.next = next;
    this.checkUser();
  }

  public checkUser() {
    if (!this.user) this.next(new ClientError('user not found'));
  }

  public getDeck(id: string | number) {
    this.deck = this.user.decks.id(id);

    if (!this.deck) this.next(new ClientError('deck not found'));
    return this;
  }

  public getCard(cardId: string | number) {
    this.card = this.deck!.data.id(cardId);
    if (!this.card) this.next(new ClientError('card not found'));
    return this;
  }
}
