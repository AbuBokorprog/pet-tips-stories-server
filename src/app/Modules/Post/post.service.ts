import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IPost } from './post.interface';
import { postModel } from './post.model';

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

// const votePost = async (id: string) => {};

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
  //   votePost,
};
