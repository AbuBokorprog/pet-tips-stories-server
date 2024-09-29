import { Types } from 'mongoose';

export interface IComment {
  authorId: Types.ObjectId;
  postId: Types.ObjectId;
  content: string;
  parentComment: Types.ObjectId[];
  replies: Types.ObjectId[];
}
