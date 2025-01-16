import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import config from '../../config';
import { authServices } from './auth.services';

const createUser = catchAsync(async (req, res) => {
  const data = await authServices.createUser(req.file, req.body);

  successResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: data,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const data = await authServices.userLogin(req.body);

  res.cookie('refreshToken', data.refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: data,
  });
});

export const authControllers = {
  userLogin,
  createUser,
};
