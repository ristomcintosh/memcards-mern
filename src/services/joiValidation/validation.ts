import Joi from '@hapi/joi';
import { User } from '../mongo/models/user.model';
import { Flashcard } from '../mongo/models/flashcard.model';

function validateUser(user: User) {
  const schema = Joi.object({
    userName: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  });

  return schema.validate(user);
}

function validateLogin(user: User) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  });

  return schema.validate(user);
}

function validateFlashcard(flashcard: Flashcard) {
  const schema = Joi.object({
    front: Joi.string()
      .max(100)
      .required(),
    back: Joi.string()
      .max(100)
      .required(),
    image: Joi.object({
      src: Joi.string(),
      alt: Joi.string(),
      thumb: Joi.string()
    }).allow(null)
  });

  return schema.validate(flashcard);
}

function validateDeckName(deckName: string) {
  const schema = Joi.string()
    .max(100)
    .required();

  return schema.validate(deckName);
}

export default {
  validateUser,
  validateLogin,
  validateFlashcard,
  validateDeckName
};
