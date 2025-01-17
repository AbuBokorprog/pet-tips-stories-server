import { Schema } from 'mongoose';

export type TBookmark = {
  id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
};
