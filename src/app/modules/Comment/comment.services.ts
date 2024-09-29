import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IComment } from './comment.interface';
import { commentModel } from './comment.model';
import { postModel } from '../Post/post.model';
import { startSession, Types } from 'mongoose';

const createComment = async (userId: string, payload: IComment) => {
  const session = await startSession();
  const isExistPost = await postModel.findById(payload.postId);

  if (!isExistPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'The post not found!');
  }

  try {
    session.startTransaction();
    const id = new Types.ObjectId(userId);
    payload.authorId = id;
    const res = await commentModel.create([payload], { session });

    await postModel.findByIdAndUpdate(payload.postId, {
      $addToSet: { comments: res[0]._id },
    });

    await session.commitTransaction();
    await session.endSession();
    return res;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment created failed!');
  }
};

const replyComment = async (
  userId: string,
  parentCommentId: Types.ObjectId,
  payload: IComment,
) => {
  const session = await startSession();

  const isExistPost = await postModel.findById(payload.postId);

  if (!isExistPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'The post not found!');
  }

  const isExistParentComment = await commentModel.findById(parentCommentId);

  if (!isExistParentComment) {
    throw new AppError(httpStatus.NOT_FOUND, 'The comment not found!');
  }

  try {
    session.startTransaction();
    const id = new Types.ObjectId(userId);
    payload.authorId = id;
    payload.parentComment = [isExistParentComment._id];
    const res = await commentModel.create([payload], { session });

    await postModel.findByIdAndUpdate(payload.postId, {
      $addToSet: { comments: res[0]._id },
    });

    await session.commitTransaction();
    await session.endSession();
    return res;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment created failed!');
  }
};

const retrieveComment = async () => {
  const res = await commentModel
    .find()
    .populate('parentComment')
    .populate('postId')
    .populate('authorId');

  if (!res) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment retrieved failed!');
  }

  return res;
};

const updateComment = async (id: string, payload: Partial<IComment>) => {
  const res = await commentModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!res) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment update failed!');
  }

  return res;
};
const deleteComment = async (id: string) => {
  const res = await commentModel.findByIdAndDelete(id);

  if (!res) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment delete failed!');
  }

  return res;
};

export const commentServices = {
  createComment,
  retrieveComment,
  updateComment,
  deleteComment,
  replyComment,
};
