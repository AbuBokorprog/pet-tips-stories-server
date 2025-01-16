import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { userServices } from './user.services';
import { Types } from 'mongoose';

const retrievedUsers = catchAsync(async (req, res) => {
  const data = await userServices.retrievedUsers(req.query);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: data,
  });
});

const retrieveSpecificUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await userServices.retrieveSpecificUser(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: data,
  });
});

const retrievedMe = catchAsync(async (req, res) => {
  const user = req.user;
  const data = await userServices.retrievedMe(user && user._id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: data,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = req.user;
  const data = await userServices.updateUser(
    req.file,
    user && user._id,
    req.body,
  );

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: data,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await userServices.updateUserRole(id, req.body);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully',
    data: data,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const data = await userServices.deleteUser(req.params.id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: data,
  });
});

const followUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const followedId = new Types.ObjectId(id);
  const data = await userServices.followUser(user && user._id, followedId);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User followed successfully',
    data: data,
  });
});

const unFollowUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const followedId = new Types.ObjectId(id);
  const data = await userServices.unFollowUser(user && user._id, followedId);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unfollow successfully',
    data: data,
  });
});

export const userController = {
  updateUser,
  deleteUser,
  followUser,
  retrievedMe,
  unFollowUser,
  retrievedUsers,
  retrieveSpecificUser,
  updateUserRole,
};
