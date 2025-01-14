import { model, Schema } from 'mongoose';
import { TCategory } from './categories.interface';

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
});

export const categoryModel = model('category', categorySchema);
