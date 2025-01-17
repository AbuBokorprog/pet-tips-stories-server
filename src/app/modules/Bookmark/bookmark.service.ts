import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBookmark } from './bookmark.interface';
import { bookmarkModel } from './bookmark.model';

const createBookmark = async (payload: TBookmark) => {
  const data = await bookmarkModel.create(payload);

  return data;
};

const retrieveUserAllBookmark = async (id: string) => {
  const data = await bookmarkModel.find({ userId: id });

  return data;
};
const updateBookmark = async (id: string, payload: Partial<TBookmark>) => {
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
const deleteBookmark = async (id: string) => {
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
