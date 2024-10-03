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

// Example usage:
// const exampleUser: IUser = {
//   username: 'petLover123',
//   email: 'petlover@example.com',
//   password: 'hashed_password_here',
//   profilePicture: 'https://example.com/avatar.jpg',
//   bio: 'Lover of all things pets!',
//   role: 'user',
//   isPremium: true,
//   followers: ['userId1', 'userId2'],
//   following: ['userId3'],
//   posts: ['postId1', 'postId2'],
//   likedPosts: ['postId3'],
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   subscriptionExpiresAt: new Date('2024-12-31'),
//   paymentHistory: ['paymentId1'],
// };
