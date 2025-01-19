import mongoose, { model, Schema } from 'mongoose';
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
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const tagModel = model('tags', tagSchema);
