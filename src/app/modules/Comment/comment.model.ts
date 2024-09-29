import { model, Schema } from 'mongoose';
import { IComment } from './comment.interface';

const commentSchema = new Schema<IComment>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'post',
    },
    content: {
      type: String,
      required: true,
    },
    parentComment: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const commentModel = model('comment', commentSchema);
