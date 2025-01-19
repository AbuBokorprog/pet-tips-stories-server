import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TTag } from './tags.interface';
import { tagModel } from './tags.model';
import { postModel } from '../Post/post.model';
import { startSession, Types } from 'mongoose';

const createTag = async (payload: TTag) => {
  const data = await tagModel.create(payload);

  return data;
};

const retrieveAllTag = async () => {
  const data = await tagModel.find();

  return data;
};

const retrieveSpecificTag = async (id: string) => {
  const data = await tagModel.findById(id);

  return data;
};
const updateTag = async (id: string, payload: Partial<TTag>) => {
  const isExistTag = await tagModel.findById(id);

  if (!isExistTag) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tag not found!');
  }

  const data = await tagModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return data;
};
const deleteTag = async (id: string) => {
  const isExistTag = await tagModel.findById(id);

  if (!isExistTag) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tag not found!');
  }
  const data = await tagModel.findByIdAndDelete(id);

  return data;
};

const followTag = async (
  followerId: Types.ObjectId,
  followedId: Types.ObjectId,
) => {
  const session = await startSession();
  const isExistTag = await tagModel.findById(followerId);

  const isAlreadyFollow = isExistTag?.following.includes(followedId);

  if (isAlreadyFollow) {
    throw new AppError(httpStatus.ALREADY_REPORTED, 'Already following!');
  }

  // !follower id is Who wants to follow, and
  // !followedId is who is being followed.

  try {
    session.startTransaction();
    // * who wants to follow.
    const data = await tagModel.findByIdAndUpdate(
      followerId,
      {
        $addToSet: { following: followedId },
      },
      { new: true, runValidators: true, session },
    );

    // * who is being followed.
    await tagModel.findByIdAndUpdate(
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

const unFollowTag = async (
  followerId: Types.ObjectId,
  followedId: Types.ObjectId,
) => {
  const session = await startSession();

  const isExistTag = await tagModel.findById(followerId);

  const isAlreadyFollow = isExistTag?.following.includes(followedId);

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
    const data = await tagModel.findByIdAndUpdate(
      followerId,
      {
        $pull: { following: followedId },
      },
      { new: true, runValidators: true, session },
    );

    // *followedId is who is being unfollowed.
    await tagModel.findByIdAndUpdate(
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

export const tagsService = {
  createTag,
  retrieveAllTag,
  updateTag,
  deleteTag,
  retrieveSpecificTag,
  followTag,
  unFollowTag,
};
