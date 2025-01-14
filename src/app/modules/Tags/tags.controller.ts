import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { tagsService } from './tags.service';

const createTag = catchAsync(async (req, res) => {
  const data = await tagsService.createTag(req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Tag created successfully!',
    data,
  });
});

const retrieveAllTag = catchAsync(async (req, res) => {
  const data = await tagsService.retrieveAllTag();

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Retrieve categories successfully!',
    data,
  });
});
const updateTag = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await tagsService.updateTag(id, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Update tag successfully!',
    data,
  });
});
const deleteTag = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await tagsService.deleteTag(id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Delete tag successfully!',
    data,
  });
});

export const tagsController = {
  createTag,
  retrieveAllTag,
  updateTag,
  deleteTag,
};
