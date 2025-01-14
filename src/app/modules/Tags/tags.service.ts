import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TTag } from './tags.interface';
import { tagModel } from './tags.model';

const createTag = async (payload: TTag) => {
  const data = await tagModel.create(payload);

  return data;
};

const retrieveAllTag = async () => {
  const data = await tagModel.find();

  return data;
};
const updateTag = async (id: string, payload: Partial<TTag>) => {
  const isExistTag = await tagModel.findById(id);

  if (!isExistTag) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tag not found!');
  }

  const data = await tagModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return data;
};
const deleteTag = async (id: string) => {
  const isExistTag = await tagModel.findById(id);

  if (!isExistTag) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tag not found!');
  }
  const data = await tagModel.findByIdAndDelete(id);

  return data;
};

export const tagsService = {
  createTag,
  retrieveAllTag,
  updateTag,
  deleteTag,
};
