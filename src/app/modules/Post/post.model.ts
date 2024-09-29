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
      ref: 'user',
    },
    comments: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'user',
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
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Success'],
      default: 'Pending',
    },
    isPaymentSuccessful: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const postModel = model<IPost>('post', postSchema);
