import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBookmark } from './bookmark.interface';
import { bookmarkModel } from './bookmark.model';
import { Schema } from 'mongoose';

const createBookmark = async (
  userId: Schema.Types.ObjectId,
  payload: TBookmark,
) => {
  payload.userId = userId;
  const data = await bookmarkModel.create(payload);

  return data;
};

const retrieveUserAllBookmark = async (userId: Schema.Types.ObjectId) => {
  const data = await bookmarkModel.find({ userId }).populate('id');

  return data;
};
const updateBookmark = async (
  id: Schema.Types.ObjectId,
  payload: Partial<TBookmark>,
) => {
  const isExistBookmark = await bookmarkModel.findById(id);

  if (!isExistBookmark) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bookmark not found!');
  }

  const data = await bookmarkModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return data;
};
const deleteBookmark = async (id: Schema.Types.ObjectId) => {
  const isExistBookmark = await bookmarkModel.findById(id);

  if (!isExistBookmark) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bookmark not found!');
  }
  const data = await bookmarkModel.findByIdAndDelete(id);

  return data;
};

export const bookmarkService = {
  createBookmark,
  retrieveUserAllBookmark,
  updateBookmark,
  deleteBookmark,
};
