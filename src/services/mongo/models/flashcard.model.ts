import { Schema, Types } from 'mongoose';

export interface Flashcard extends Types.Subdocument {
  _id: number;
  front: string;
  back: string;
  image?: {
    src: string;
    alt: string;
    thumb: string;
  };
}

const FlashcardSchema: Schema = new Schema(
  {
    front: {
      type: String,
      required: true
    },
    back: {
      type: String,
      required: true
    },
    image: {
      src: String,
      alt: String,
      thumb: String
    }
  },
  { toJSON: { virtuals: true } }
);

export default FlashcardSchema;
