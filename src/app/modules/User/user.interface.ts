import { Schema } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  posts: Schema.Types.ObjectId[];
  role: 'user' | 'admin';
}
