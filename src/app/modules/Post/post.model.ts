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
    type: {
      type: String,
      enum: ['general', 'premium'],
      default: 'general',
    },
    category: {
      type: String,
      enum: ['tips', 'story'],
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    comments: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'comment',
    },
    downVotes: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'user',
    },
    upVotes: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'user',
    },
    image: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const postModel = model<IPost>('post', postSchema);
