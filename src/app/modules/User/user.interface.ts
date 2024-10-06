import { Types } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string; // Optional field for profile image URL
  bio?: string; // Optional field for user bio
  role: 'user' | 'admin'; // Role can only be 'user' or 'admin'
  isPremium: boolean; // Premium subscription status
  followers: Types.ObjectId[]; // Array of user IDs
  following: Types.ObjectId[]; // Array of user IDs
  posts: Types.ObjectId[]; // Array of post IDs created by the user
  subscriptionExpiresAt?: Date; // Optional date for premium expiration
  paymentHistory: Types.ObjectId[]; // Array of payment IDs
}
