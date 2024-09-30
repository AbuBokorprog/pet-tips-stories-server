import { Types } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  posts: Types.ObjectId[];
  isPremiumUser: boolean;
  role: 'user' | 'admin';
}
