import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IPost } from './post.interface';
import { postModel } from './post.model';
import { Types } from 'mongoose';

const createPost = async (payload: IPost) => {
  const res = await postModel.create(payload);

  if (!res) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Post created failed!');
  }

  if (res && payload.premium === true) {
    payload.price = 100;
    // payload.tran_id = `tsx-${res?._id}-${Date.now()}`;
  }

  return res;
};

const retrieveAllPosts = async () => {
  const res = await postModel.find();

  return res;
};

const specificPost = async (id: string) => {
  const res = await postModel.findById(id);

  return res;
};

const toggleUpVotes = async (postId: string, userId: Types.ObjectId) => {
  const isExistPost = await postModel.findById(postId);

  if (!isExistPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'The post not found!');
  }

  const isAlreadyUpVoted = isExistPost.upVotes.includes(userId);
  const alreadyDownVoted = isExistPost.downVotes.includes(userId);

  try {
    if (isAlreadyUpVoted) {
      const data = await postModel.findByIdAndUpdate(
        postId,
        {
          $pull: { upVotes: userId },
        },
        { new: true, runValidators: true },
      );

      return data;
    } else if (alreadyDownVoted) {
      const data = await postModel.findByIdAndUpdate(
        postId,
        {
          $pull: { downVotes: userId },
          $addToSet: { upVotes: userId },
        },
        { new: true, runValidators: true },
      );

      return data;
    } else {
      const data = await postModel.findByIdAndUpdate(
        postId,
        {
          $addToSet: { upVotes: userId },
        },
        { new: true, runValidators: true },
      );
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

const toggleDownVotes = async (postId: string, userId: Types.ObjectId) => {
  const isExistPost = await postModel.findById(postId);

  if (!isExistPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'The post not found!');
  }

  const isAlreadyDownVoted = isExistPost.downVotes.includes(userId);
  const alreadyUpVoted = isExistPost.upVotes.includes(userId);

  try {
    if (isAlreadyDownVoted) {
      const data = await postModel.findByIdAndUpdate(
        postId,
        {
          $pull: { downVotes: userId },
        },
        { new: true, runValidators: true },
      );

      return data;
    } else if (alreadyUpVoted) {
      const data = await postModel.findByIdAndUpdate(
        postId,
        {
          $pull: { upVotes: userId },
          $addToSet: { downVotes: userId },
        },
        { new: true, runValidators: true },
      );

      return data;
    } else {
      const data = await postModel.findByIdAndUpdate(
        postId,
        {
          $addToSet: { downVotes: userId },
        },
        { new: true, runValidators: true },
      );
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

const updatePost = async (id: string, payload: Partial<IPost>) => {
  const res = await postModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return res;
};

const deletePost = async (id: string) => {
  const res = await postModel.findByIdAndDelete(id);
  return res;
};

export const postServices = {
  createPost,
  retrieveAllPosts,
  updatePost,
  deletePost,
  specificPost,
  toggleUpVotes,
  toggleDownVotes,
};
