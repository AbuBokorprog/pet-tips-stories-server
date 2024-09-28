import { Types } from 'mongoose';

export interface IPost {
  title: string;
  content: string;
  category: 'tips' | 'story';
  image: string[];
  authorId: Types.ObjectId;
  upVotes: Types.ObjectId[];
  downVotes: Types.ObjectId[];
  premium: boolean;
  price: number;
  comments: Types.ObjectId[];
}
