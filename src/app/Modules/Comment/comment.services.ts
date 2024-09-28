import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IComment } from './comment.interface';
import { commentModel } from './comment.model';
const createComment = async (payload: IComment) => {
  const res = await commentModel.create(payload);

  if (!res) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment created failed!');
  }

  return res;
};

const retrieveComment = async () => {
  const res = await commentModel.find();

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
};
