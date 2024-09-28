import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import { userServices } from './user.services';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body);

  successResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const data = await userServices.userLogin(req.body);

  res.cookie('refreshToken', data.refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  successResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User logged in successfully',
    data: data,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userServices.updateUser(req.params.id, req.body);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userServices.deleteUser(req.params.id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: user,
  });
});

const followUser = catchAsync(async (req, res) => {
  const user = await userServices.followUser(
    req.params.id,
    req.body.followerId,
  );

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User followed successfully',
    data: user,
  });
});

const unFollowUser = catchAsync(async (req, res) => {
  const user = await userServices.unFollowUser(
    req.params.id,
    req.body.followerId,
  );

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unfollowed successfully',
    data: user,
  });
});

export const userController = {
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
};
