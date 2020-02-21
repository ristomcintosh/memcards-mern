import mongoose, { Schema, Types } from 'mongoose';
import FlashcardSchema, { Flashcard } from './flashcard.model';

export interface Deck extends Types.Subdocument {
  name: string;
  editable?: boolean;
  data: Types.DocumentArray<Flashcard>;
}

const DeckSchema: Schema = new mongoose.Schema(
  {
    name: String,
    editable: {
      type: Boolean,
      default: true
    },
    data: [FlashcardSchema]
  },
  { toJSON: { virtuals: true } }
);

DeckSchema.virtual('totalCards').get(function(this: Deck): number {
  return this.data.length;
});

export default DeckSchema;
