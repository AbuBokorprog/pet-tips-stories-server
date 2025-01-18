import { model, Schema } from 'mongoose';
import { TBookmark } from './bookmark.interface';

const bookmarkSchema = new Schema<TBookmark>(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'post',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  },
);

export const bookmarkModel = model('bookmark', bookmarkSchema);
