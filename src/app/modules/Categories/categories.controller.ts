import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { categoryService } from './categories.server';

const createCategory = catchAsync(async (req, res) => {
  const data = await categoryService.createCategory(req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully!',
    data,
  });
});

const retrieveAllCategory = catchAsync(async (req, res) => {
  const data = await categoryService.retrieveAllCategory();

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Retrieve categories successfully!',
    data,
  });
});
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await categoryService.updateCategory(id, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Update category successfully!',
    data,
  });
});
const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await categoryService.deleteCategory(id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Delete category successfully!',
    data,
  });
});

export const categoryController = {
  createCategory,
  retrieveAllCategory,
  updateCategory,
  deleteCategory,
};
