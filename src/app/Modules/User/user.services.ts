import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { userModel } from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken } from './user.utils';
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

const updateUser = async (id: string, payload: IUser) => {
  const user = await userModel.findByIdAndUpdate(id, payload, { new: true });
  return user;
};

const deleteUser = async (id: string) => {
  const user = await userModel.findByIdAndDelete(id);
  return user;
};

const followUser = async (userId: string, followerId: string) => {
  await userModel.findByIdAndUpdate(userId, {
    $addToSet: { following: followerId },
  });
  await userModel.findByIdAndUpdate(followerId, {
    $addToSet: { followers: userId },
  });
};

const unFollowUser = async (userId: string, followerId: string) => {
  await userModel.findByIdAndUpdate(userId, {
    $pull: { followers: followerId },
  });
  await userModel.findByIdAndUpdate(followerId, {
    $pull: { following: userId },
  });
};

export const userServices = {
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
};
