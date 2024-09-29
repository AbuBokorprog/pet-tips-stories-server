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

const retrievedMe = async (id: string) => {
  const res = await userModel.findById(id);

  if (!res) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
  }

  return res;
};

const updateUser = async (id: string, payload: IUser) => {
  const user = await userModel.findByIdAndUpdate(id, payload, { new: true });
  return user;
};

const deleteUser = async (id: string) => {
  const user = await userModel.findByIdAndDelete(id);
  return user;
};

const followUser = async (followerId: string, followedId: string) => {
  // !follower id is Who wants to follow, and
  // !followedId is who is being followed.

  // * who wants to follow.
  await userModel.findByIdAndUpdate(followerId, {
    $addToSet: { following: followedId },
  });

  // * who is being followed.
  await userModel.findByIdAndUpdate(followedId, {
    $addToSet: { followers: followerId },
  });
};

const unFollowUser = async (followerId: string, followedId: string) => {
  // !followerId is Who wants to unfollow, and
  // !followedId is who is being unfollowed.

  // *followerId is Who wants to unfollow.
  await userModel.findByIdAndUpdate(followerId, {
    $pull: { following: followedId },
  });

  // *followedId is who is being unfollowed.
  await userModel.findByIdAndUpdate(followedId, {
    $pull: { followers: followerId },
  });
};

export const userServices = {
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  followUser,
  retrievedMe,
  unFollowUser,
};
