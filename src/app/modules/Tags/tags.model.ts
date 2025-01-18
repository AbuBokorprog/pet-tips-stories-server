import { model, Schema } from 'mongoose';
import { TTag } from './tags.interface';

const tagSchema = new Schema<TTag>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const tagModel = model('tags', tagSchema);
