import { Types } from 'mongoose';

export type TTag = {
  name: string;
  description?: string;
  followers: Types.ObjectId[]; // Array of user IDs
  following: Types.ObjectId[]; // Array of user IDs
};
