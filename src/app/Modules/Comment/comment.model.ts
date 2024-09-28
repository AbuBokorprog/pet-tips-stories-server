import { model, Schema } from 'mongoose';
import { IComment } from './comment.interface';

const commentSchema = new Schema<IComment>(
  {
    authorId: {
      types: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    postId: {
      types: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const commentModel = model<IComment>('comment', commentSchema);
