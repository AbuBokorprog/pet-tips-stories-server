import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { userModel } from './user.model';
import { startSession, Types } from 'mongoose';
import { QueryBuilder } from '../../builder/queryBuilder';
import { userSearchableFields } from './user.constants';
import { ImageUpload } from '../../utils/imageUploader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const retrievedUsers = async (query: any) => {
  const allUsers = new QueryBuilder(
    userModel
      .find()
      .populate('followers')
      .populate('following')
      .populate({
        path: 'posts',
        populate: {
          path: 'authorId',
        },
      }),
    query,
  )
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await allUsers.modelQuery;
  const meta = await allUsers.countTotal();

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
  }

  return {
    data,
    meta,
  };
};

const retrieveSpecificUser = async (id: string) => {
  const res = await userModel
    .findById(id)
    .populate('followers')
    .populate('following')
    .populate({
      path: 'posts',
      populate: {
        path: 'authorId',
      },
    });

  if (!res) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
  }

  return res;
};

const retrievedMe = async (id: string) => {
  const res = await userModel
    .findById(id)
    .populate('followers')
    .populate('following')
    .populate({
      path: 'posts',
      populate: {
        path: 'authorId',
      },
    });

  if (!res) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
  }

  return res;
};

const updateUser = async (file: any, id: string, payload: Partial<IUser>) => {
  const isExistUser = await userModel.findById(id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!');
  }
  if (file) {
    const imagePath = file?.path;
    const imageName = `${payload?.username ? payload?.username : isExistUser?.username}-${Date.now()}-${Math.random().toString(10).substr(2, 9)}`;
    const response: any = await ImageUpload(imageName, imagePath);
    payload.profilePicture = response.secure_url || file?.path;
  }
  const user = await userModel.findByIdAndUpdate(id, payload, { new: true });
  return user;
};

const updateUserRole = async (id: string, payload: Partial<IUser>) => {
  const user = await userModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

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
  retrievedUsers,
  retrieveSpecificUser,
  updateUserRole,
};
