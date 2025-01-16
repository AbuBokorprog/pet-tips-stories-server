import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IPost } from './post.interface';
import { postModel } from './post.model';
import { startSession, Types } from 'mongoose';
import { userModel } from '../User/user.model';
import { QueryBuilder } from '../../builder/queryBuilder';
import { searchableFields } from './post.constants';
import { ImageUpload } from '../../utils/imageUploader';

const createPost = async (file: any, id: string, payload: IPost) => {
  if (file) {
    const imagePath = file.path;
    const imageName = `${payload.title.slice(0, 10)}-${new Date()}-${Math.random().toString(10).substr(2, 9)}`;
    const response: any = await ImageUpload(imageName, imagePath);
    payload.image = response.secure_url || file.path;
  }
  const session = await startSession();
  const isExistUser = await userModel.findById(id);

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found');
  }

  try {
    session.startTransaction();
    payload.authorId = isExistUser?._id;
    const res = await postModel.create([payload], { session });

    if (!res) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Post created failed!');
    }

    await userModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { posts: res[0]?._id },
      },
      { new: true, runValidators: true, session },
    );

    await session.commitTransaction();
    await session.endSession();
    return res;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const retrieveAllPosts = async (query: any) => {
  const allPosts = new QueryBuilder(
    postModel.find().populate('authorId'),
    // .populate('comments')
    // .populate('downVotes')
    // .populate('upVotes'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await allPosts.modelQuery;
  const meta = await allPosts.countTotal();

  return {
    data,
    meta,
  };
};

const retrieveAllPostByAuthor = async (authorId: string) => {
  const data = await postModel
    .find({ authorId: authorId })
    .populate('authorId')
    .populate({
      path: 'comments',
      populate: {
        path: 'authorId',
        model: 'user',
      },
    })
    .populate('downVotes')
    .populate('upVotes')
    .sort('-createdAt');

  return data;
};

const specificPost = async (id: string) => {
  const res = await postModel
    .findById(id)
    .populate('authorId')
    .populate({
      path: 'comments',
      populate: {
        path: 'authorId', // populate authorId inside each comment
        model: 'user',
      },
    })
    .populate('downVotes')
    .populate('upVotes');

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

const updatePost = async (file: any, id: string, payload: Partial<IPost>) => {
  const isExistPost = await postModel.findById(id);
  if (!isExistPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!');
  }
  if (file) {
    const imagePath = file.path;
    const imageName = `${payload?.title ? payload.title.slice(0, 10) : isExistPost?.title}-${new Date()}-${Math.random().toString(10).substr(2, 9)}`;
    const response: any = await ImageUpload(imageName, imagePath);
    payload.image = response.secure_url || file.path;
  }
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
  retrieveAllPostByAuthor,
};
