import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCategory } from './categories.interface';
import { categoryModel } from './categories.model';
import { ImageUpload } from '../../utils/imageUploader';

const createCategory = async (file: any, payload: TCategory) => {
  if (file) {
    const imagePath = file.path;
    const imageName = `${payload.name}-${new Date()}-${Math.random().toString(10).substr(2, 9)}`;
    const response: any = await ImageUpload(imageName, imagePath);
    payload.image = response.secure_url || file.path;
  }

  const data = await categoryModel.create(payload);

  return data;
};

const retrieveAllCategory = async () => {
  const data = await categoryModel.find();

  return data;
};
const updateCategory = async (
  file: any,
  id: string,
  payload: Partial<TCategory>,
) => {
  const isExistCategory = await categoryModel.findById(id);

  if (!isExistCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }

  if (file) {
    const imagePath = file.path;
    const imageName = `${payload?.name ? payload.name : isExistCategory?.name}-${new Date()}-${Math.random().toString(10).substr(2, 9)}`;
    const response: any = await ImageUpload(imageName, imagePath);
    payload.image = response.secure_url || file.path;
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
