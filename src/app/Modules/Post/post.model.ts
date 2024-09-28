import { model, Schema } from 'mongoose';
import { IPost } from './post.interface';

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['tips', 'story'],
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comments: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'User',
    },
    downVotes: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'User',
    },
    upVotes: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'User',
    },
    image: {
      type: [String],
      required: true,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: null,
    },
    tran_id: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const postModel = model<IPost>('post', postSchema);
