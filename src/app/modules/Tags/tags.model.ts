import { model, Schema } from 'mongoose';
import { TTag } from './tags.interface';

const tagSchema = new Schema<TTag>({
  name: {
    type: String,
    unique: true,
  },
});

export const tagModel = model('tags', tagSchema);
