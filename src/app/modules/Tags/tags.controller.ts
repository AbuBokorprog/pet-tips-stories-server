import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { tagsService } from './tags.service';
import { Types } from 'mongoose';

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
    message: 'Retrieve tags successfully!',
    data,
  });
});

const retrieveSpecificTag = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await tagsService.retrieveSpecificTag(id);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Retrieve tag successfully!',
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

const followTag = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const followedId = new Types.ObjectId(id);
  const data = await tagsService.followTag(user && user._id, followedId);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tag followed successfully',
    data: data,
  });
});

const unFollowTag = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const followedId = new Types.ObjectId(id);
  const data = await tagsService.unFollowTag(user && user._id, followedId);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tag unfollow successfully',
    data: data,
  });
});

export const tagsController = {
  createTag,
  retrieveAllTag,
  updateTag,
  deleteTag,
  followTag,
  retrieveSpecificTag,
  unFollowTag,
};
