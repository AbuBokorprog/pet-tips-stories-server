import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { userModel } from './user.model';
import { startSession, Types } from 'mongoose';

const retrievedMe = async (id: string) => {
  const res = await userModel
    .findById(id)
    .populate('followers')
    .populate('following')
    .populate('posts');

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

const followUser = async (
  followerId: Types.ObjectId,
  followedId: Types.ObjectId,
) => {
  const session = await startSession();
  const isExistUser = await userModel.findById(followerId);

  const isAlreadyFollow = isExistUser?.following.includes(followedId);

  if (isAlreadyFollow) {
    throw new AppError(httpStatus.ALREADY_REPORTED, 'Already following!');
  }

  // !follower id is Who wants to follow, and
  // !followedId is who is being followed.

  try {
    session.startTransaction();
    // * who wants to follow.
    const data = await userModel.findByIdAndUpdate(
      followerId,
      {
        $addToSet: { following: followedId },
      },
      { new: true, runValidators: true, session },
    );

    // * who is being followed.
    await userModel.findByIdAndUpdate(
      followedId,
      {
        $addToSet: { followers: followerId },
      },
      { new: true, runValidators: true, session },
    );

    await session.commitTransaction();
    await session.endSession();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, error.message as string);
  }
};

const unFollowUser = async (
  followerId: Types.ObjectId,
  followedId: Types.ObjectId,
) => {
  const session = await startSession();

  const isExistUser = await userModel.findById(followerId);

  const isAlreadyFollow = isExistUser?.following.includes(followedId);

  if (!isAlreadyFollow) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      'You are not following yet!',
    );
  }

  // !followerId is Who wants to unfollow, and
  // !followedId is who is being unfollowed.

  try {
    session.startTransaction();
    // *followerId is Who wants to unfollow.
    const data = await userModel.findByIdAndUpdate(
      followerId,
      {
        $pull: { following: followedId },
      },
      { new: true, runValidators: true, session },
    );

    // *followedId is who is being unfollowed.
    await userModel.findByIdAndUpdate(
      followedId,
      {
        $pull: { followers: followerId },
      },
      { new: true, runValidators: true, session },
    );

    await session.commitTransaction();
    await session.endSession();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message as string);
  }
};

export const userServices = {
  updateUser,
  deleteUser,
  followUser,
  retrievedMe,
  unFollowUser,
};
