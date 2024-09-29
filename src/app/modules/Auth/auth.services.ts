import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from '../User/user.interface';
import { userModel } from '../User/user.model';
import bcrypt from 'bcrypt';
import { createToken } from '../User/user.utils';
import config from '../../config';
const createUser = async (payload: IUser) => {
  const user = await userModel.create(payload);
  return user;
};

const userLogin = async (payload: { email: string; password: string }) => {
  const isUserExit = await userModel.findOne({ email: payload.email });

  if (!isUserExit) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
  }

  const isMatched = bcrypt.compare(payload.password, isUserExit.password);

  if (!isMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Password incorrect, please try again!',
    );
  }

  const jwtPayload = {
    email: isUserExit.email,
    role: isUserExit.role,
    _id: isUserExit?._id,
    username: isUserExit.username,
    profilePicture: isUserExit?.profilePicture,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.access_expires as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expires as string,
  );

  return {
    accessToken,
    refreshToken,
    user: isUserExit,
  };
};

export const authServices = {
  userLogin,
  createUser,
};
