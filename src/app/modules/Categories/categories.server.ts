import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCategory } from './categories.interface';
import { categoryModel } from './categories.model';

const createCategory = async (payload: TCategory) => {
  const data = await categoryModel.create(payload);

  return data;
};

const retrieveAllCategory = async () => {
  const data = await categoryModel.find();

  return data;
};
const updateCategory = async (id: string, payload: Partial<TCategory>) => {
  const isExistCategory = await categoryModel.findById(id);

  if (!isExistCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }

  const data = await categoryModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return data;
};
const deleteCategory = async (id: string) => {
  const isExistCategory = await categoryModel.findById(id);

  if (!isExistCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }
  const data = await categoryModel.findByIdAndDelete(id);

  return data;
};

export const categoryService = {
  createCategory,
  retrieveAllCategory,
  updateCategory,
  deleteCategory,
};
